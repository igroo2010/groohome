import { GoogleGenAI } from "@google/genai";
import { TranslationResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCorrectionAndTranslation = async (text: string): Promise<TranslationResult> => {
    const prompt = `
        You are an expert linguist specializing in Korean and English.
        Your task is to perform two steps on the user's provided Korean text:
        1.  Correct any spelling and grammatical errors in the Korean text to make it sound natural and accurate.
        2.  Translate the *corrected* Korean text into fluent, natural-sounding English.

        Please provide the output in a JSON format with two keys: "corrected_korean" and "english_translation". Do not include any other text or markdown formatting.

        Original Korean Text:
        """
        ${text}
        """
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.3,
            },
        });
        
        let jsonStr = response.text?.trim() ?? "";
        if (!jsonStr) {
            throw new Error("Gemini API 응답이 비어 있습니다.");
        }
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        try {
            const parsedData = JSON.parse(jsonStr) as TranslationResult;
            if (!parsedData.corrected_korean || !parsedData.english_translation) {
                throw new Error("API 응답이 예상된 형식이 아닙니다.");
            }
            return parsedData;
        } catch (e) {
            console.error("Failed to parse JSON response:", e, "Raw response:", jsonStr);
            throw new Error("API로부터 받은 JSON을 파싱하는데 실패했습니다.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Gemini API 호출 중 오류가 발생했습니다.");
    }
};
