import User from "../models/User.js";
import Course from "../models/Course.js";
import  Purchase  from "../models/Purchase.js";
import Stripe from "stripe";
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId).populate("enrolledCourses");
    res.json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);
    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data not found" });
    }

    const finalAmount = Number(
      (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2)
    );

    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId,
      amount: finalAmount,
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = (process.env.CURRENCY || "USD").toLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: { name: courseData.courseTitle },
          unit_amount: Math.round(finalAmount * 100),
        },
        quantity: 1,
      },
    ];

    const frontendUrl = origin || process.env.FRONTEND_URL;
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${frontendUrl}/loading/my-enrollments?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl || origin || ""}/`,
      line_items,
      mode: "payment",
      customer_email: userData.email,
      metadata: { purchaseId: newPurchase._id.toString() },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    if (progressData){
      if(progressData.lectureCompleted.includes(lectureId)){
        return res.json({ success: true, message: "Lecture already completed" });
      }
    }else{
      await CourseProgress.create({ userId, courseId, lecturesCompleted: [lectureId] }); 
    }
    res.json({ success: true, message: "Progress updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    res.json({ success: true, data: progressData });
  }catch (error) {
    res.json({ success: false, message: error.message });
  }
    }

    export const addUserRating = async (req, res) => {
     const userId = req.auth.userId;
      const { courseId, rating} = req.body;
      if(!courseId||!userId||!rating || rating<1 || rating>5){
        return res.json({ success: false, message: "Invalid data provided" });
      }
      try {
        const course= await Course.findById(courseId);
        if (!course) {
          return res.json({ success: false, message: "Course not found" });
        }
       const user = await User.findById(userId);
        if (!user||!user.enrolledCourses.includes(courseId)) {
          return res.json({ success: false, message: "User not found" });
        }
        const existingRatingIndex = course.courseRatings.findIndex(r=> r.userId === userId)
        if(existingRatingIndex>-1){
          course.courseRatings[existingRatingIndex].rating = rating;
        }else{
          course.courseRatings.push({userId,rating});
        }
        await course.save();
        res.json({ success: true, message: "Rating added successfully" });
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    }

export const verifyStripePayment = async (req, res) => {
    try {
        const { session_id } = req.query;
        if (!session_id) {
          return res.status(400).json({ success: false, message: "Missing session_id" });
        }

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripeInstance.checkout.sessions.retrieve(session_id);

        if (!session) {
          return res.status(404).json({ success: false, message: "Session not found" });
        }

        const { purchaseId } = session.metadata || {};
        if (!purchaseId) {
          return res.status(400).json({ success: false, message: "Missing purchaseId in metadata" });
        }

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) {
          return res.status(404).json({ success: false, message: "Purchase not found" });
        }

        if (purchaseData.status === "completed") {
          return res.json({ success: true, status: "completed" });
        }

        if (session.payment_status === "paid") {
          const userData = await User.findById(purchaseData.userId);
          const courseData = await Course.findById(purchaseData.courseId);

          if (!userData || !courseData) {
            return res.status(404).json({ success: false, message: "User or Course not found" });
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

          return res.json({ success: true, status: "completed" });
        }

        return res.json({ success: true, status: session.payment_status || "pending" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};