
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiInsights = async (topic: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a Senior Data Scientist at a Netflix-like company, explain the following: ${topic}. 
      Context: ${context}. 
      Keep it professional, data-driven, and focused on business value (retention, DAU, engagement). 
      Format with clean Markdown. Use bullet points.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "Failed to generate insights.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI consultant is currently offline. Please review the model metrics directly.";
  }
};
