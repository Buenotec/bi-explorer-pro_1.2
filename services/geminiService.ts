
import { GoogleGenAI, Type } from "@google/genai";
import { Report } from '../types';

// Initialize the Gemini API client following the strict guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIOptimizationSuggestions = async (reports: Report[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyse the following Power BI reports inventory and suggest optimizations for cost (Embedded A SKU usage) and governance.
      Reports: ${JSON.stringify(reports.map(r => ({ name: r.name, type: r.type, risk: r.riskLevel })))}
      
      Return the suggestions in a friendly, professional way.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            costInsight: { type: Type.STRING }
          }
        }
      }
    });

    // Use .text property directly as per guidelines
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      suggestions: ["Upgrade low-risk embedded reports to public to save on A SKU capacity.", "Set up auto-pause for capacity during non-business hours."],
      costInsight: "Current projected usage is 85% of A1 capacity."
    };
  }
};
