
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "Braxx Tactical Specialist", an AI shopping assistant for Braxx USA. 
Braxx USA sells high-performance tactical electric supermotos (GT and GT PRO series).
Your tone is professional, knowledgeable, brief, and rugged.
Technical Specifications:
- Range: 50 miles
- Peak Power: 12kW
- Top Speed: 60 mph
Keep responses under 50 words. Focus on performance and tactical utility.
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  userMessage: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...history.slice(-10).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
    });

    return response.text || "Communication failure. Link severed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Comms interrupted. Tactical support unavailable.";
  }
};
