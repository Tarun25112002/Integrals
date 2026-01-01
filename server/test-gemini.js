import { GoogleGenerativeAI } from "@google/generative-ai";
import "./configs/env.js";

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // For listing models, we don't need a specific model instance,
    // but the SDK usually exposes it via the client or a specific manager.
    // In @google/generative-ai, we can't directly list models easily without using the REST API
    // or if the SDK exposes it.
    // Actually, the error message says "Call ListModels to see the list of available models".
    // The SDK might not expose listModels directly on the main class in older versions,
    // but let's try a simple generation with a known safe model "gemini-pro" or "gemini-1.5-flash"
    // to see if it works now that the key is fixed.

    console.log(
      "Testing API Key:",
      process.env.GEMINI_API_KEY ? "Present" : "Missing"
    );

    const modelName = "gemini-flash-latest";
    console.log(`Attempting to use model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response details:", error.response);
    }
  }
}

listModels();
