import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import Transcription from "../models/Transcription.js";
import Course from "../models/Course.js";

// Initialize Gemini AI - handle missing API key gracefully
let genAI = null;
try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("✓ Gemini AI initialized successfully");
  } else {
    console.warn(
      "⚠ Warning: GEMINI_API_KEY not found in environment variables"
    );
  }
} catch (err) {
  console.error("✗ Failed to initialize Gemini AI:", err.message);
}

// Helper: chunk text for RAG
const chunkText = (text, size = 1200, overlap = 100) => {
  if (!text) return [];
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(text.length, i + size);
    chunks.push(text.slice(i, end));
    i = end - overlap;
    if (i <= 0) i = end;
  }
  return chunks;
};

// Helper: score chunks by relevance to question
const rankChunks = (chunks, question) => {
  const terms = (question || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return chunks
    .map((chunk, idx) => {
      const words = chunk.toLowerCase().split(/[^a-z0-9]+/);
      let score = 0;
      terms.forEach((term) => {
        if (words.includes(term)) score += 1;
      });
      return { chunk, score, idx };
    })
    .sort((a, b) => b.score - a.score || a.idx - b.idx);
};

// Main: Ask a question about video content
export const askQuestion = async (req, res) => {
  try {
    console.log("\n=== Chatbot Request ===");
    console.log("CourseId:", req.body.courseId);
    console.log("LectureId:", req.body.lectureId);
    console.log("Question:", req.body.question?.slice(0, 100));

    const { courseId, lectureId, question, conversationHistory } = req.body;

    // Validate required fields
    if (!courseId || !lectureId || !question) {
      console.log("✗ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Missing required fields: courseId, lectureId, or question",
      });
    }

    // Validate courseId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      console.log("✗ Invalid courseId format:", courseId);
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    // Check if Gemini is initialized
    if (!genAI) {
      console.error("✗ Gemini AI not initialized");
      return res.status(500).json({
        success: false,
        message: "AI service not configured. Please check GEMINI_API_KEY.",
      });
    }

    // Find the course
    console.log("→ Finding course...");
    const course = await Course.findById(courseId);
    if (!course) {
      console.log("✗ Course not found");
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    console.log("✓ Course found:", course.courseTitle);

    // Find lecture details
    let lectureTitle = "General";
    let chapterTitle = "Course Content";

    if (lectureId && lectureId !== "default") {
      for (const chapter of course.courseContent || []) {
        const lecture = (chapter.chapterContent || []).find(
          (l) => l.lectureId === lectureId
        );
        if (lecture) {
          lectureTitle = lecture.lectureTitle || "Lecture";
          chapterTitle = chapter.chapterTitle || "Chapter";
          break;
        }
      }
    }
    console.log("→ Lecture:", lectureTitle, "| Chapter:", chapterTitle);

    // Try to get transcription (optional)
    let transcription = null;
    let ragContent = "";

    try {
      if (lectureId && lectureId !== "default") {
        transcription = await Transcription.findOne({
          courseId: new mongoose.Types.ObjectId(courseId),
          lectureId,
        });

        if (transcription?.content) {
          console.log(
            "✓ Transcription found, length:",
            transcription.content.length
          );
          const chunks = chunkText(transcription.content);
          const ranked = rankChunks(chunks, question);
          const topChunks = ranked.slice(0, 3).map((c) => c.chunk.trim());
          ragContent = topChunks.join("\n\n---\n\n");
        } else {
          console.log("→ No transcription for this lecture");
        }
      }
    } catch (err) {
      console.log("→ Transcription lookup skipped:", err.message);
    }

    // Build conversation context
    let conversationContext = "";
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      conversationContext = conversationHistory
        .slice(-6)
        .map((m) => `${m.role === "user" ? "Student" : "AI"}: ${m.content}`)
        .join("\n");
    }

    // Build the prompt
    const prompt = `You are an AI tutor helping a student with an online course.

COURSE INFORMATION:
- Course: ${course.courseTitle}
- Chapter: ${chapterTitle}
- Lecture: ${lectureTitle}
- Description: ${(course.courseDescription || "")
      .replace(/<[^>]*>/g, "")
      .slice(0, 500)}

${
  ragContent
    ? `VIDEO TRANSCRIPT EXCERPTS:\n${ragContent}\n`
    : "Note: No transcript available for this video. Answer based on course context and general knowledge."
}

${conversationContext ? `RECENT CONVERSATION:\n${conversationContext}\n` : ""}

STUDENT'S QUESTION: ${question}

INSTRUCTIONS:
- Answer based on the course content and transcript if available
- Be helpful, clear, and educational
- Use bullet points for lists
- If asked for summary, give 3-5 key points
- If asked for practice questions, create 3-5 relevant questions
- Be honest if you don't have specific information

FORMAT:
- Respond in GitHub-flavored Markdown
- Use short headings (e.g., "## Summary", "## Key Concepts") when helpful
- Use fenced code blocks with a language tag for code (example: three backticks + js)
- Use tables when comparing items
- Do not include raw HTML

YOUR RESPONSE:`;

    const modelName = process.env.GEMINI_MODEL || "gemini-flash-latest";
    console.log("→ Calling Gemini API...", modelName);

    // Call Gemini - configurable model name
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const answer = response.text();

    console.log("✓ Gemini response received, length:", answer?.length || 0);

    // Create a markdown-friendly version of the answer.
    // - convert common bullet characters to '-' for markdown lists
    // - normalize newlines and ensure paragraphs are separated
    const raw =
      answer ||
      "I apologize, but I couldn't generate a response. Please try again.";
    let answerMarkdown = String(raw).replace(/\r\n/g, "\n");
    answerMarkdown = answerMarkdown.replace(/•\s*/g, "- ");
    // Collapse excessive blank lines
    answerMarkdown = answerMarkdown.replace(/\n{3,}/g, "\n\n");
    // Convert single newlines into paragraph breaks except when they appear inside lists or code blocks
    answerMarkdown = answerMarkdown.replace(
      /([^\n])\n(?!\n|\s*[-*0-9]+\.)/g,
      "$1\n\n"
    );
    answerMarkdown = answerMarkdown.trim();

    return res.json({
      success: true,
      answer: raw,
      answerMarkdown,
      hasTranscription: !!transcription?.content,
    });
  } catch (error) {
    console.error("\n=== Chatbot Error ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);

    // Handle Gemini quota / rate limit errors
    const message = String(error?.message || "");
    const isRateLimited =
      message.includes("[429") ||
      message.toLowerCase().includes("too many requests") ||
      message.toLowerCase().includes("quota");
    if (isRateLimited) {
      // Try to extract RetryInfo delay from message: "Please retry in 57.6s" or "retryDelay":"57s"
      let retryAfterSeconds = null;
      const retryInMatch = message.match(/Please\s+retry\s+in\s+([0-9.]+)s/i);
      if (retryInMatch?.[1])
        retryAfterSeconds = Math.ceil(Number(retryInMatch[1]));
      const retryDelayMatch = message.match(/"retryDelay"\s*:\s*"(\d+)s"/i);
      if (!retryAfterSeconds && retryDelayMatch?.[1]) {
        retryAfterSeconds = Number(retryDelayMatch[1]);
      }

      if (retryAfterSeconds) {
        res.set("Retry-After", String(retryAfterSeconds));
      }

      return res.status(429).json({
        success: false,
        message: retryAfterSeconds
          ? `AI is rate-limited. Please try again in ${retryAfterSeconds}s.`
          : "AI is rate-limited. Please try again shortly.",
        retryAfterSeconds,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to process your question. Please try again.",
      error: error.message,
    });
  }
};

// Store transcription for a lecture
export const storeTranscription = async (req, res) => {
  try {
    const { courseId, lectureId, content, language } = req.body;

    if (!courseId || !lectureId || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: courseId, lectureId, or content",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let lectureTitle = "Lecture";
    for (const chapter of course.courseContent || []) {
      const lecture = (chapter.chapterContent || []).find(
        (l) => l.lectureId === lectureId
      );
      if (lecture) {
        lectureTitle = lecture.lectureTitle || "Lecture";
        break;
      }
    }

    const transcription = await Transcription.findOneAndUpdate(
      { courseId, lectureId },
      {
        courseId,
        lectureId,
        lectureTitle,
        content,
        language: language || "en",
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Transcription saved successfully",
      transcription,
    });
  } catch (error) {
    console.error("Store transcription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to store transcription",
      error: error.message,
    });
  }
};

// Get transcription for a lecture
export const getTranscription = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format",
      });
    }

    const transcription = await Transcription.findOne({ courseId, lectureId });

    res.json({
      success: true,
      exists: !!transcription,
      transcription: transcription || null,
    });
  } catch (error) {
    console.error("Get transcription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get transcription",
      error: error.message,
    });
  }
};
