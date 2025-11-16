import { Webhook } from "svix";
import User from "../models/User.js";
import "dotenv/config";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (e) {
    res.json({ sucess: false, error: e.message });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  console.log("=== Stripe Webhook Received ===");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`Webhook verified. Event type: ${event.type}`);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log(`Processing event: ${event.type}`);
    console.log("Event data:", JSON.stringify(event.data.object, null, 2));

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log(`Session ID: ${session.id}`);
        console.log(`Payment Status: ${session.payment_status}`);
        console.log(`Session Metadata:`, session.metadata);

        // Only process if payment status is paid
        if (session.payment_status !== "paid") {
          console.log(
            `Payment not completed for session ${session.id}, status: ${session.payment_status}`
          );
          return res
            .status(200)
            .json({ received: true, message: "Payment not paid yet" });
        }

        const { purchaseId } = session.metadata || {};

        if (!purchaseId) {
          console.error("No purchaseId found in session metadata");
          console.error("Available metadata:", session.metadata);
          return res
            .status(200)
            .json({ received: true, error: "No purchaseId in metadata" });
        }

        console.log(`Looking up purchase: ${purchaseId}`);
        const purchaseData = await Purchase.findById(purchaseId);

        if (!purchaseData) {
          console.error(`Purchase not found: ${purchaseId}`);
          return res
            .status(200)
            .json({ received: true, error: "Purchase not found" });
        }

        console.log(`Current purchase status: ${purchaseData.status}`);

        // Check if already processed
        if (purchaseData.status === "completed") {
          console.log(`Purchase ${purchaseId} already completed`);
          return res
            .status(200)
            .json({ received: true, message: "Already completed" });
        }

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (!userData || !courseData) {
          console.error("User or Course not found");
          console.error(
            `User: ${userData ? "found" : "not found"}, Course: ${
              courseData ? "found" : "not found"
            }`
          );
          return res
            .status(200)
            .json({ received: true, error: "User or Course not found" });
        }

        // Add user to course enrolled students if not already enrolled
        if (!courseData.enrolledStudents.includes(userData._id)) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
          console.log(`Added user ${userData._id} to course ${courseData._id}`);
        }

        // Add course to user enrolled courses if not already enrolled
        if (!userData.enrolledCourses.includes(courseData._id)) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
          console.log(`Added course ${courseData._id} to user ${userData._id}`);
        }

        purchaseData.status = "completed";
        await purchaseData.save();

        console.log(`✅ Purchase ${purchaseId} marked as completed`);
        return res
          .status(200)
          .json({ received: true, success: true, purchaseId });
      }
      case "checkout.session.async_payment_succeeded": {
        // Handle async payment methods (like bank transfers)
        const session = event.data.object;
        const { purchaseId } = session.metadata;

        if (!purchaseId) {
          console.error("No purchaseId found in session metadata");
          break;
        }

        const purchaseData = await Purchase.findById(purchaseId);

        if (!purchaseData) {
          console.error(`Purchase not found: ${purchaseId}`);
          break;
        }

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (!userData || !courseData) {
          console.error("User or Course not found");
          break;
        }

        if (!courseData.enrolledStudents.includes(userData._id)) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
        }

        if (!userData.enrolledCourses.includes(courseData._id)) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
        }

        purchaseData.status = "completed";
        await purchaseData.save();

        console.log(
          `Purchase ${purchaseId} marked as completed (async payment)`
        );
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        const { purchaseId } = session.metadata;

        if (purchaseId) {
          const purchaseData = await Purchase.findById(purchaseId);
          if (purchaseData) {
            purchaseData.status = "failed";
            await purchaseData.save();
            console.log(`Purchase ${purchaseId} marked as failed`);
          }
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return res
          .status(200)
          .json({ received: true, message: `Unhandled event: ${event.type}` });
    }

    // Fallback response if no case matches
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error handling webhook:", error);
    console.error("Error stack:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
