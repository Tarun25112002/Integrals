import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lectureId: {
      type: String,
      required: true,
    },
    lectureTitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "en",
    },
    // Chunked content for better RAG retrieval (optional for future enhancement)
    chunks: [
      {
        text: String,
        startTime: Number, // timestamp in seconds
        endTime: Number,
      },
    ],
    // Metadata
    duration: {
      type: Number, // video duration in seconds
    },
    wordCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Compound index for efficient lookup
transcriptionSchema.index({ courseId: 1, lectureId: 1 }, { unique: true });

// Pre-save hook to calculate word count
transcriptionSchema.pre("save", function (next) {
  if (this.content) {
    this.wordCount = this.content.split(/\s+/).length;
  }
  next();
});

const Transcription = mongoose.model("Transcription", transcriptionSchema);

export default Transcription;
