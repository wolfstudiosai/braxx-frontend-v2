
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "Braxx Tactical Specialist", an AI shopping assistant for Braxx USA. 
Braxx USA sells high-performance tactical electric supermotos (GT and GT PRO series).
Keep responses under 50 words. Be professional, rugged, and technical.
Range: 50 miles. Peak Power: 12kW. Top Speed: 60 mph.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  userMessage: string
): Promise<string> => {
  try {
    // Guidelines: Use new GoogleGenAI({ apiKey: process.env.API_KEY })
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
    });

    return response.text || "Connection lost. Retry transmission.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tactical comms failure.";
  }
};
