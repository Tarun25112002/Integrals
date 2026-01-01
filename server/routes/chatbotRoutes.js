import express from "express";
import {
  askQuestion,
  storeTranscription,
  getTranscription,
} from "../controllers/chatbotController.js";

const chatbotRouter = express.Router();

// Ask a question about the video content
chatbotRouter.post("/ask", askQuestion);

// Store transcription for a lecture (called by educator or automated process)
chatbotRouter.post("/transcription", storeTranscription);

// Get transcription for a lecture
chatbotRouter.get("/transcription/:courseId/:lectureId", getTranscription);

export default chatbotRouter;
