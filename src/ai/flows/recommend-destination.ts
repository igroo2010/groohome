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
  location: z.string().describe('사용자의 실제 출발 위치 정보'),
});
export type RecommendDestinationInput = z.infer<
  typeof RecommendDestinationInputSchema
>;

const RecommendDestinationOutputSchema = z.object({
  personaTitle: z.string().describe('여행자 성향/스타일에 맞는 한글 타이틀'),
  destinationName: z.string().describe('추천 여행지 이름.'),
  imageUrl: z.string().describe('추천 여행지 이미지 URL.'),
  analysis: z.string().describe('여행지 상세설명(특징, 분위기, 매력 등)'),
  recommendations: z.array(z.object({
    type: z.string(),
    name: z.string(),
    description: z.string(),
    address: z.string(),
    preferenceScore: z.number().describe('0~1 사이의 float, 높을수록 더 추천').optional(),
  })).describe('추천 숙소/맛집/명소 각 1곳, 실제 이름/주소, preferenceScore 포함'),
  budget: z.string().describe('평균 여행경비(2박 3일, 1인 기준)'),
  transport: z.string().describe('대표 교통편, 현지 교통, 실제 가격/소요시간 등'),
  tip: z.string().describe('여행 팁'),
  popularity: z.string().describe('여행지의 대중 선호도'),
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
  // 예시: 1500000 (원화)
  return 1500000;
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
      location: z.string(),
    }),
  },
  output: {
    schema: z.object({
      personaTitle: z.string(),
      destinationName: z.string(),
      analysis: z.string(),
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
  prompt: `[퀴즈 문항 예시]\n- \"여행에서 가장 중요하게 생각하는 가치는?\" → \"완전한 휴식과 스트레스 해소\"\n- \"이상적인 여행 기간은?\" → \"일주일 정도의 여유로운 여행\"\n- \"가장 마음이 편안해지는 자연환경은?\" → \"파도 소리가 들리는 해변\"\n- \"신체 활동 강도에 대한 선호는?\" → \"적당한 운동량의 가벼운 활동\"\n- \"평소 휴일을 보내는 방식은?\" → \"집에서 푹 쉬며 재충전\"\n\n[지침]\n- 반드시 대한민국 국내(한국) 여행지(도시, 지역, 명소)만 추천할 것. 해외 여행지는 절대 추천하지 말 것.\n- 서울, 부산, 인천, 대구, 대전, 광주, 울산 등 대도시는 추천 대상에서 제외할 것.\n- 반드시 한국관광공사에서 추천하는 주요 관광지(도시/지역/명소) 내에서만 추천할 것.\n- destinationName(추천 여행지 이름)은 반드시 시/군/구 앞에 해당 도/광역시/특별시를 붙여서 예: '전라남도 담양', '경상북도 경주', '서울특별시 강남구'처럼 지역+도시 형태로 출력할 것. (예시: '담양'이 아니라 '전라남도 담양'으로)\n- 퀴즈 답변의 조합에 따라 여행지 추천 결과가 다양하게 나오도록 할 것\n- 퀴즈 답변을 주로 참고하되, 필요시 바이오리듬 등 다른 입력값도 참고할 것\n- 추천지는 반드시 실제 존재하는 도시/국가명으로, 답변과 논리적으로 연결될 것\n\n[중요] 아래 입력값(Physical, Emotional, Intellectual, Perceptual, Quiz Answers, Popularity, UserLocation 등) 모든 정보를 반드시 최대한 꼼꼼하게 참조하여, 각 항목(여행지, 분석, 추천 장소, 예산, 교통, 팁 등)을 논리적으로 생성할 것. 입력값을 무시하거나 임의로 결과를 생성하지 말고, 반드시 입력값을 근거로 결과를 도출할 것.\n\nThe following are the user's biorhythm values, travel tendencies (quiz answers), and the popularity of the recommended destination among all users. Based on this information, generate a recommended destination and the reason for the recommendation.\n\n[Input]\n- Physical: {{{physical}}}\n- Emotional: {{{emotional}}}\n- Intellectual: {{{intellectual}}}\n- Perceptual: {{{perceptual}}}\n- Quiz Answers: {{{quizAnswers}}}\n- Popularity: {{{popularity}}}\n- UserLocation: {{{location}}}\n  (UserLocation은 사용자의 실제 출발 위치 정보입니다. 반드시 교통편 생성 시 출발지로 활용할 것)\n\n[Output]\n1. personaTitle: (반드시 한글 2단어 조합, 예: \"감성 힐링가\", \"모험 탐험가\" 등. 10자 이내, 이모지 금지)\n2. destinationName: (반드시 퀴즈 답변만을 근거로 사용자의 여행 성향에 가장 적합한 실제 존재하는 도시 또는 국가명을 한글로 추천할 것. 바이오리듬 수치는 참고하지 말 것. 단순히 임의로 정하지 말고, 입력된 퀴즈 답변에 논리적으로 어울리는 여행지를 선정할 것. 영어, 번역, 괄호, 설명문, 이모지 등은 절대 포함하지 말 것. 반드시 시/군/구 앞에 해당 도/광역시/특별시를 붙여서 예: '전라남도 담양', '경상북도 경주', '서울특별시 강남구'처럼 지역+도시 형태로 출력할 것. (예시: '담양'이 아니라 '전라남도 담양'으로))\n3. analysis: 반드시 추천 지역(destinationName)의 상세설명(특징, 분위기, 매력 등)만 5~6문장으로 구체적이고 풍부하게 작성할 것. 바이오리듬, 퀴즈 답변, 수치, 영어, 기호, 추천 이유 등은 포함하지 말고, 해당 지역의 자연, 명소, 분위기, 계절감, 음식, 문화, 여행 매력 등만 자연스러운 한글로 설명할 것.\n4. recommendations: 반드시 destinationName(추천된 도시/국가) 내에 실제로 존재하는 숙소 1곳, 맛집 1곳, 명소 1곳만 추천할 것. 총 3개만 포함할 것. 다른 지역의 장소, 가상의 장소, 번역된 이름, 설명문, 이모지 등은 절대 포함하지 말 것. For each of accommodation, restaurant, and attraction within destinationName, set name as follows:\n   - If the place is in Korea, use only the official Korean name (no English, no translation, no parentheses).\n   - If the place is outside Korea, use only the official English name (no Korean, no translation, no parentheses).\n   - Do not mix languages, do not use both Korean and English, do not use parentheses or slashes, and do not translate.\n   - Example: \"호텔 사보이\" (for Korea), \"Hotel Savoy\" (for outside Korea)\n   Each item should include type (one of '숙소', '맛집', '명소'), name, description (Korean, within 30 characters), address (actual address, within 50 characters), and preferenceScore (a float between 0 and 1, where higher means more strongly recommended for the user. Example: 0.92).\n5. budget: 반드시 destinationName(추천된 도시/국가) 기준의 실제 물가와 여행 경비를 현실적으로 반영해서 작성할 것. 각 항목(숙박, 식비, 액티비티, 교통비, 기타 등)은 한 줄씩 줄바꿈해서 작성. \n모든 금액은 반드시 '원' 단위(예: 50,000원)로만 표기하고, 외화(엔, 달러, 유로 등)는 절대 사용하지 말 것.\n각 항목별 금액은 현실적인 범위(예: 숙박 80,000~300,000원, 식비 20,000~100,000원, 액티비티 10,000~100,000원 등)에서 랜덤하게 생성하고, \n항목별로 금액이 너무 비슷하지 않게 충분한 차이를 두어 다양하게 표기할 것.\n기타 항목은 반드시 '기념품, 소소한 간식, 현지 교통비 등 실제 여행에서 발생할 수 있는 추가 비용'만 포함할 것. 기타 항목에 불필요한 설명, 이상한 항목, 설명문, AI 안내문 등은 절대 넣지 말 것. 예시: 기타: 10,000원 (예: 기념품, 간식, 현지 교통비 등)\n마지막 줄에 '총 1박 기준: 총액(원)' 형태로 합산 금액을 표기할 것.\n6. transport: 반드시 UserLocation(입력된 위치)에서 destinationName(추천 여행지)까지 실제 이동 경로, 교통수단, 소요시간, 가격을 현실적으로 안내할 것. 임의의 출발지(서울, 김포 등)는 절대 사용하지 말 것. 반드시 한국어로, '비행', '시내' 각각 한 줄씩 줄바꿈해서 작성.
7. tip: 반드시 destinationName(추천된 도시/국가)에서 실제로 유용한 여행 팁만 포함할 것. 반드시 한국어로, 각 항목별로 줄바꿈해서 3–4가지 이상, 각 팁은 20–50자 이내의 구체적이고 실질적인 문장으로 안내. 예시: '자외선이 강하니 SPF50 이상의 선크림을 꼭 챙기세요.'
8. imagePrompt: In English, provide a highly artistic, emotional, and visually stunning photo of the recommended destination, as if taken by a professional local photographer. The image should be high-resolution, realistic, and capture the unique atmosphere and beauty of the place. Avoid illustrations or cartoons. Use a cinematic, travel magazine style. No people, no text, no watermark, no logo, no cartoon, no illustration, no drawing, no painting, no animation, no emoji.
+ 반드시 사진작가가 직접 촬영한 것처럼 아름답고 현실적인 명소 사진이어야 하며, 해당 지역의 대표적 장소가 뚜렷하게 드러나야 함.
+모든 설명, 분석, 추천 결과(analysis, recommendations.description 등)는 반드시 한국어로 작성할 것. 영어로 작성하지 말 것. 영어가 포함되면 반드시 한국어로만 다시 작성할 것.
+ 반드시 실제 존재하는 명소, 거리, 건물, 랜드마크 등 구체적 장소가 포함되어야 하며, 사람들이 실제로 가보고 싶다고 느낄만한 현실적인 장소로 묘사할 것. 자연 풍경만 묘사하지 말고, 구체적 위치(예: 에펠탑, 도쿄 시부야 거리, 뉴욕 타임스퀘어 등)가 반드시 드러나야 함.
9. popularity: 반드시 Tripadvisor, Expedia, Booking.com 등 주요 여행 플랫폼의 실제 평점, 리뷰 수, 방문자 수 등 일반 사용자 데이터를 조합해 총점(선호도)을 현실적으로 작성할 것. 예: 'Tripadvisor 4.7/5, Expedia 4.5/5, Booking.com 9.1/10, 리뷰 총 3,200개, 방문자 수 기준 인기 지역' 등. 임의의 수치나 설명, AI 안내문 등은 넣지 말 것.

Return in the JSON format as shown below.`,
});

const recommendDestinationFlow = ai.defineFlow(
  {
    name: 'recommendDestinationFlow',
    inputSchema: RecommendDestinationInputSchema,
    outputSchema: RecommendDestinationOutputSchema,
  },
  async ({ birthDate, quizAnswers, physical, emotional, intellectual, perceptual, ip, location }: RecommendDestinationInput) => {
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
          location,
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
    /*let flightPrice = 1500000;
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
    //const budget = `항공: ${flightPrice.toLocaleString()}원\n${destinationDetails.budget.replace(/^항공:[^\n]*\n?/, '')}`;
    const result = {
      personaTitle: destinationDetails.personaTitle,
      destinationName: destinationDetails.destinationName,
      imageUrl: media.url,
      analysis: destinationDetails.analysis,
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
