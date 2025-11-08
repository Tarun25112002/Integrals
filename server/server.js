import express from "express";
import connectDB from "./configs/mongodb.js";
import cors from "cors";
import "dotenv/config";
import clerkWebhookSecret from "./controllers/webhooks.js";
import { connect } from "mongoose";
const app = express();
app.use(cors());
await connectDB();
const PORT = process.env.PORT || 5000;
app.get('/', (req,res)=>{
    res.send("API Working")
})
app.post('/clerk', express.json(), clerkWebhookSecret)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
