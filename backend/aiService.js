import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Conversational AI using OpenAI GPT
 */
export async function generateAIResponse(userMessage, conversationHistory = []) {
  try {
    const messages = [
      { role: "system", content: "You are a helpful and friendly AI assistant." },
      ...conversationHistory.map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      })),
      { role: "user", content: userMessage }
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.8,
      max_completion_tokens: 150
    });

    const aiReply = response.choices[0].message.content.trim();
    return aiReply;

  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return "Oops! My brain hiccuped… Try again 😅";
  }
}
