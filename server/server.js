import express from "express";
import connectDB from "./configs/mongodb.js";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(cors());
await connectDB();

const PORT = process.env.PORT || 5000;

app.post("/clerk", express.json(), clerkWebhooks);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
