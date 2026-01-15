
import { GoogleGenAI } from "@google/genai";

// Guidelines: Must use named parameter { apiKey: process.env.API_KEY } for initialization
export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
