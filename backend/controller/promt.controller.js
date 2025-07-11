import OpenAI from "openai";
import { Promt } from "../model/promt.model.js";

// Initialize OpenAI with OpenRouter base URL
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Make sure this env var is set
});

export const sendPromt = async (req, res) => {
  const { content } = req.body;
   const userId = req.userId || bodyUserId;

//   if (!userId) {
//     return res.status(400).json({ error: "userId is required" });
//   }

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Promt content is required" });
  }

  try {
    // Save user's prompt
    const userPrompt = await Promt.create({
      userId,
      role: "user",
      content,
    });

    // Send to OpenRouter (DeepSeek model)
 const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",  // replace with your valid model name
  messages: [{ role: "user", content }],
});

    const aiContent = completion.choices?.[0]?.message?.content || "No response";

    // Save assistant's response
    const aiMessage = await Promt.create({
       userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });
  } catch (error) {
    console.error("Error in Prompt:", error);

    return res.status(500).json({
      error: error?.message || "Something went wrong with the AI response",
    });
  }
};