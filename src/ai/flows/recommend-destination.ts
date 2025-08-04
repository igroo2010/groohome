'use server';
/**
 * @fileOverview 사용자의 바이오리듬을 기반으로 여행지를 추천합니다.
 *
 * - recommendDestination - 바이오리듬을 분석하여 여행지와 관련 이미지를 반환합니다.
 * - RecommendDestinationInput - recommendDestination 함수의 입력 타입입니다.
 * - RecommendDestinationOutput - recommendDestination 함수의 반환 타입입니다.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getAdminSettings } from '@/lib/adminSettingsCache';

const RecommendDestinationInputSchema = z.object({
  birthDate: z.string().describe('사용자의 생년월일 (ISO 8601 형식).'),
  quizAnswers: z.array(z.string()).describe('사용자의 퀴즈 답변 목록'),
  physical: z.number(),
  emotional: z.number(),
  intellectual: z.number(),
  perceptual: z.number(),
  ip: z.string().optional().describe('사용자의 IP 주소 (항공권 가격 산출용)'),
});
export type RecommendDestinationInput = z.infer<
  typeof RecommendDestinationInputSchema
>;

const RecommendDestinationOutputSchema = z.object({
  personaTitle: z.string().describe('Persona title suitable for the traveler/style, in English'),
  destinationName: z.string().describe('Recommended destination name (city/country, in English)'),
  imageUrl: z.string().describe('Recommended destination image URL'),
  analysis: z.string().describe('Analysis and reason for recommendation based on biorhythm + quiz (long explanation, in English)'),
  shortAnalysis: z.string().describe('Summary of analysis and reason for recommendation based on biorhythm + quiz, within 20 characters, in English'),
  recommendations: z.array(z.object({
    type: z.string(),
    name: z.string(),
    description: z.string(),
    address: z.string(),
    preferenceScore: z.number().describe('float between 0~1, higher means more recommended').optional(),
  })).describe('One recommended accommodation/restaurant/attraction each, with real name/address, preferenceScore included'),
  budget: z.string().describe('Average travel budget (2 nights 3 days, per person, in English)'),
  transport: z.string().describe('Main transportation, local transportation, actual price/time, etc. (in English)'),
  tip: z.string().describe('Travel tips (in English)'),
  popularity: z.string().describe('Popularity of the destination (in English)'),
});
export type RecommendDestinationOutput = z.infer<
  typeof RecommendDestinationOutputSchema
>;

// [2단계] 이미지 생성을 위한 전용 헬퍼 함수
/**
 * 주어진 프롬프트를 사용하여 이미지를 생성합니다.
 * @param model 사용할 이미지 생성 모델 ID
 * @param prompt 이미지 생성을 위한 텍스트 프롬프트
 * @returns 생성된 이미지 (URL 또는 Buffer) 또는 실패 시 null
 */
async function generateImageWithPrompt(model: string, prompt: string): Promise<any | null> {
  try {
    const result = await ai.generate({
      model,
      prompt: { text: prompt },
      config: { responseModalities: ["TEXT", "IMAGE"] },
    });
    return result.media;
  } catch (error: any) {
    console.error(`[ERROR] Image generation failed for model ${model}:`, error);
    if (error.status === 400) {
      console.error("잘못된 모달리티 조합입니다. TEXT와 IMAGE를 요청했는지 확인하세요.");
    }
    return null;
  }
}

// 항공권 가격 조회 스텁 함수 (실제 API 연동 필요)
async function getFlightPrice(fromIp: string, to: string): Promise<number> {
  // 실제 구현 시 Skyscanner, Kayak 등 API 연동 필요
  // fromIp로 출발지 추정, to는 도착 도시/국가명
  // 예시: $1500 USD
  return 1500;
}

const destinationPrompt = ai.definePrompt({
  name: 'destinationPrompt',
  input: {
    schema: z.object({
      physical: z.number(),
      emotional: z.number(),
      intellectual: z.number(),
      perceptual: z.number(),
      quizAnswers: z.array(z.string()),
      popularity: z.string(),
    }),
  },
  output: {
    schema: z.object({
      personaTitle: z.string(),
      destinationName: z.string(),
      analysis: z.string(),
      shortAnalysis: z.string(),
      recommendations: z.array(z.object({
        type: z.string(),
        name: z.string(),
        description: z.string(),
        address: z.string(),
        preferenceScore: z.number().optional(),
      })),
      budget: z.string(),
      transport: z.string(),
      tip: z.string(),
      imagePrompt: z.string(),
      popularity: z.string(),
    }),
  },
  // 프롬프트 강화: personaName=도시명, destinationName=구체적 지역명만 반환하도록 명시
  prompt: `[Quiz Example]
- "What do you value most in travel?" → "Complete rest and stress relief"
- "What is your ideal travel duration?" → "A relaxed schedule of about a week"
- "What is the most calming natural environment for you?" → "Beach with waves crashing"
- "What is your preferred physical activity intensity?" → "Light activity with appropriate exercise"
- "What is your way of spending your free time?" → "Resting at home and recharging"

[Guidelines]
- The combination of quiz answers should result in a variety of recommended destinations.
- Refer mainly to quiz answers, but also consider biorhythm and other inputs as needed.
- The recommended destination must be a real city/country, and logically connected to the answers.

[Important] Carefully reference all input values (Physical, Emotional, Intellectual, Perceptual, Quiz Answers, Popularity, etc.) to logically generate each item (destination, analysis, recommendations, budget, transport, tip, etc.). Do not ignore input values or generate results arbitrarily; always base results on the input values.

// === 프롬프트 강화 부분 시작 ===
[Super Important]
- personaName에는 반드시 도시명만(예: "Tokyo", "Paris", "New York" 등)을 넣으세요.
- destinationName에는 반드시 해당 도시 내의 구체적 지역/랜드마크명만(예: "Shibuya", "Montmartre", "Times Square" 등)을 넣으세요.
- personaName과 destinationName을 합치면 "Tokyo - Shibuya"처럼 하나의 여행지 전체 이름이 됩니다.
- personaName에는 지역명, 랜드마크명, 설명, 이모지, 괄호, 번역, 부가설명 등을 넣지 마세요. 오직 도시명만!
- destinationName에는 도시명 없이 지역/랜드마크명만! (예: "Shibuya"만, "Tokyo - Shibuya"는 X)
// === 프롬프트 강화 부분 끝 ===

The following are the user's biorhythm values, travel tendencies (quiz answers), and the popularity of the recommended destination among all users. Based on this information, generate a recommended destination and the reason for the recommendation.

[Input]
- Physical: {{{physical}}}
- Emotional: {{{emotional}}}
- Intellectual: {{{intellectual}}}
- Perceptual: {{{perceptual}}}
- Quiz Answers: {{{quizAnswers}}}
- Popularity: {{{popularity}}}
  (This value is the overall user popularity for the destination. Example: 1,200 likes, rating 4.8/5, ranked 1st overall)

[Output]
1. personaName: (도시명만, 예: "Tokyo", "Paris", "New York" 등)
2. destinationName: (해당 도시 내의 구체적 지역/랜드마크명만, 예: "Shibuya", "Montmartre", "Times Square" 등)
3. analysis: Refer to biorhythm values and quiz answers, but do not expose numbers, English words (Physical, Emotional, etc.), symbols, parentheses, colons, etc. Write only a natural English explanation, 5-6 sentences, analyzing the user's travel preferences, values, activity preferences, personality traits, etc., based on quiz answers. If numbers, non-English, or symbols are included, rewrite in natural English only.
4. shortAnalysis: (In English, within 20 characters, must be included)
5. recommendations: Only recommend real accommodation, restaurant, and attraction within personaName + destinationName. Do not include places from other regions, fictional places, translated names, explanations, or emojis. For each of accommodation, restaurant, and attraction within personaName + destinationName, set name as follows:
   - Use only the official English name (no Korean, no translation, no parentheses).
   - Do not mix languages, do not use both Korean and English, do not use parentheses or slashes, and do not translate.
   - Example: "Hotel Savoy"
   Each item should include type (one of 'accommodation', 'restaurant', 'attraction'), name, description (English, within 30 characters), address (actual address, within 50 characters), and preferenceScore (a float between 0 and 1, where higher means more strongly recommended for the user. Example: 0.92).
6. budget: Write the actual cost of living and travel expenses for personaName + destinationName. Each item (accommodation, food, activities, transportation, etc.) should be written on a new line. 
All amounts must be in USD (e.g., $50 USD), do not use other currencies (yen, won, euro, etc.).
Each item should have a realistic range (e.g., accommodation $80~$300 USD, food $20~$100 USD, activities $10~$100 USD, etc.), and there should be enough variation between items. For "Other", only include additional costs that may actually occur during travel (e.g., souvenirs, snacks, local transportation, etc.). Do not include unnecessary explanations, strange items, or AI notices. Example: Other: $10 USD (e.g., souvenirs, snacks, local transportation, etc.)
On the last line, write 'Total per night: $total amount USD'.
7. transport: Only include actual transportation, time, and price for personaName + destinationName. In English, write one line for 'Flight', one for 'Local'.
8. tip: Only include actually useful travel tips for personaName + destinationName. In English, write 3–4 items, each 20–50 characters, on a new line. Example: 'The sun is strong, so be sure to bring sunscreen SPF50 or higher.'
9. imagePrompt: In English, provide a highly artistic, emotional, and visually stunning photo of the recommended destination, as if taken by a professional local photographer. The image should be high-resolution, realistic, and capture the unique atmosphere and beauty of the place. Avoid illustrations or cartoons. Use a cinematic, travel magazine style. No people, no text, no watermark, no logo, no cartoon, no illustration, no drawing, no painting, no animation, no emoji.
+ All explanations, analysis, and recommendation results (analysis, shortAnalysis, recommendations.description, etc.) must be written in English. If non-English is included, rewrite in English only.
+ Must include specific real places, streets, buildings, landmarks, etc., that people would actually want to visit. Do not describe only natural scenery; specific locations (e.g., Eiffel Tower, Shibuya Street in Tokyo, Times Square in New York, etc.) must be included.
10. popularity: (Popularity of this destination. Example: 1,200 likes, rating 4.8/5, ranked 1st overall)

Return in the JSON format as shown below. The shortAnalysis field must be included.

Example JSON:
{
  "personaName": "Tokyo",
  "destinationName": "Shibuya",
  ...
  "recommendations": [
    {
      "type": "accommodation",
      "name": "Hotel Savoy",
      "description": "Luxury hotel in the city center",
      "address": "249 Dongho-ro, Jung-gu, Seoul",
      "preferenceScore": 0.92
    },
    ...
  ],
  "popularity": "1,200 likes, rating 4.8/5, ranked 1st overall"
}
Be sure to include all fields as in the example above, and for each item in recommendations, only include type, name, description, address, and preferenceScore. The shortAnalysis field must be included.`,
});



const recommendDestinationFlow = ai.defineFlow(
  {
    name: 'recommendDestinationFlow',
    inputSchema: RecommendDestinationInputSchema,
    outputSchema: RecommendDestinationOutputSchema,
  },
  async ({ birthDate, quizAnswers, physical, emotional, intellectual, perceptual, ip }: RecommendDestinationInput) => {
    const dob = new Date(birthDate);
    const rhythms = { physical, emotional, intellectual, perceptual };

    // .env에서 AI Key/모델 정보 읽기
    const aiSettings = await getAdminSettings();
    if (!aiSettings) throw new Error('AI 설정 정보를 불러올 수 없습니다.');
    const { text_model, text_model_apikey, image_model, image_model_apikey } = aiSettings;

    // 1회 프롬프트 호출
    let destinationDetails;
    try {
      const { output } = await destinationPrompt(
        {
          physical,
          emotional,
          intellectual,
          perceptual,
          quizAnswers,
          popularity: '',
        },
        {
          model: text_model,
          config: {
            apiKey: text_model_apikey,
            temperature: 1.3,   // 다양성 증가
            top_p: 0.95         // 다양성 증가
          },
        }
      );
      destinationDetails = output;
      if (Array.isArray(destinationDetails.recommendations)) {
        destinationDetails.recommendations = destinationDetails.recommendations.map((rec: { [key: string]: any }) => ({
          ...rec,
          description: rec.description || '설명 없음',
        }));
      }
      //console.log('destinationName:', destinationDetails.destinationName);
    } catch (e) {
      throw new Error('destinationPrompt 호출 실패: ' + (e instanceof Error ? e.message : e));
    }
    if (!destinationDetails) {
      throw new Error('Failed to get destination details from LLM.');
    }

    // 항공권 가격 조회
    /*let flightPrice = 1500;
    if (ip && destinationDetails.destinationName) {
      flightPrice = await getFlightPrice(ip, destinationDetails.destinationName);
    }*/

    // 이미지 생성 호출 (헬퍼 함수 사용)
    let media;
    try {
      media = await generateImageWithPrompt(image_model, destinationDetails.imagePrompt);
    } catch (e) {
      media = { url: '/default-image.png' };
    }
    if (!media || !media.url) {
      media = { url: '/default-image.png' };
    }

    // 여행 경비 문자열 생성 (항공권 가격 반영)
    //const budget = `Flight: $${flightPrice} USD\n${destinationDetails.budget.replace(/^Flight:[^\n]*\n?/, '')}`;
    const result = {
      personaTitle: destinationDetails.personaTitle,
      destinationName: destinationDetails.destinationName,
      imageUrl: media.url,
      analysis: destinationDetails.analysis,
      shortAnalysis: destinationDetails.shortAnalysis,
      recommendations: destinationDetails.recommendations,
      budget: destinationDetails.budget || '정보 없음',
      transport: destinationDetails.transport,
      tip: destinationDetails.tip,
      popularity: destinationDetails.popularity,
    };
    return {
      ...result,
      imageUrl: media.url,
    };
  }
);

export async function recommendDestination(
  input: RecommendDestinationInput
): Promise<RecommendDestinationOutput> {
  return recommendDestinationFlow(input);
}
