import express from "express";
import connectDB from "./configs/mongodb.js";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import "./configs/cloudinary.js"; // ← Just import to run the config (no await, no function call)
import courseRouter from "./routes/courseRoutes.js";


const app = express();
app.use(cors());
app.use(clerkMiddleware());
await connectDB();
// Remove this line: await connectCloudinary();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API Working");
});
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
