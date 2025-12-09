import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { generateAIResponse } from './aiService.js';
import { getChatHistory, saveMessage } from './storage/storage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.json({
    message: "AI Chat Backend API",
    provider: "Groq - Llama3",
    status: "running",
    endpoints: {
      "GET /history": "Get full chat history",
      "POST /message": "Send a message and receive AI response"
    }
  });
});

// Fetch chat history
app.get('/history', async (req, res) => {
  try {
    const history = await getChatHistory();
    res.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch history" });
  }
});

// Send message and get response
app.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message cannot be empty"
      });
    }

    const userMessage = message.trim();
    const timestamp = new Date().toISOString();

    // Save user message
    await saveMessage({
      role: "user",
      content: userMessage,
      timestamp
    });

    // Get chat history for AI context
    const history = await getChatHistory();

    // Generate AI response
    const aiResponse = await generateAIResponse(userMessage, history);
    const aiTimestamp = new Date().toISOString();

    // Save AI message
    await saveMessage({
      role: "assistant",
      content: aiResponse,
      timestamp: aiTimestamp
    });

    res.json({
      success: true,
      response: aiResponse,
      timestamp: aiTimestamp
    });

  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to process request",
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
    console.log("AI Provider: OpenAI GPT-4o-mini");
    console.log("OpenAI Key:", process.env.OPENAI_API_KEY ? "Configured ✔" : "Missing ❌");    
});
