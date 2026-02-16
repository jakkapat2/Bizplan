import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI Client
// The API key must be provided in the environment variable API_KEY.
// We use the new GoogleGenAI constructor pattern.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEventDescription = async (
  title: string,
  category: string,
  location: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing. Returning mock description.");
    return "This is a placeholder description because the API Key is missing. Please configure your API Key to use AI generation.";
  }

  try {
    const prompt = `Write a captivating, short (2-3 sentences) event description for an event titled "${title}". 
    The category is "${category}" and it is happening in "${location}". 
    The tone should be exciting and inviting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Join us for this amazing event!";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Join us for this amazing event! (AI generation failed)";
  }
};
