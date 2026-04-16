import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { Translate } from "@google-cloud/translate";

dotenv.config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing in .env file!");
}

// 🔥 Gemini 3 Fast Utility Function (2026 Optimized)
const callGemini = async (prompt) => {
  try {
    // 2026 ka sabse fast model: gemini-3.1-flash-lite-preview
    const model = "gemini-3.1-flash-lite-preview"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `API Error: ${response.status}`);
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("AI returned no results (Possible Safety Block)");
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("❌ AI ERROR:", error.message);
    throw error;
  }
};

// 🌍 1. Translation Route
router.post("/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) return res.status(400).json({ error: "Missing fields" });

    const prompt = `Act as a professional translator. Translate exactly into ${targetLanguage}. Return ONLY the translated text: ${text}`;
    const result = await callGemini(prompt);
    res.json({ translation: result });
  } catch (error) {
    res.status(500).json({ error: "Translation failed", details: error.message });
  }
});

// 📝 2. Summarize Route
router.post("/summarize", async (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const prompt = `Summarize the following document content in ${language || 'English'} using bullet points. Focus on key insights: ${text}`;
    const result = await callGemini(prompt);
    res.json({ summary: result });
  } catch (error) {
    res.status(500).json({ error: "Summarization failed", details: error.message });
  }
});

// 🤖 3. Chat Assistant Route (Naya Update)
router.post("/chat", async (req, res) => {
  try {
    const { message, context, language } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    // AI ko PDF ka context aur instruction de rahe hain
    const prompt = `
    You are 'VishwaVani AI', a professional document assistant. 
    Context from the uploaded document:
    ---
    ${context || "No document uploaded yet."}
    ---
    Instruction: Answer the following user question based on the context provided above. 
    If the answer is not in the context, tell the user politely.
    Answer in ${language || "English"}.

    User Question: ${message}
    `;

    const result = await callGemini(prompt);
    res.json({ reply: result });
  } catch (error) {
    res.status(500).json({ error: "Chat processing failed", details: error.message });
  }
});

export default router;
