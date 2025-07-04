import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { getAdminSettings } from '@/lib/adminSettingsCache';

async function callAIModel({ prompt, model, apiKey }: { prompt: string; model?: string; apiKey?: string }) {
  try {
    const options: any = {
      model: model || 'googleai/gemini-2.0-flash',
      prompt: { text: prompt },
      config: { responseModalities: ['TEXT'] },
    };
    if (apiKey) {
      options.config.apiKey = apiKey;
    }
    const result = await ai.generate(options);
    let text = null;
    if (typeof result.text === 'string') {
      text = result.text;
    } else if (result?.output?.text) {
      text = result.output.text;
    } else if (result?.output?.content) {
      text = result.output.content;
    }
    return text ? text.trim() : null;
  } catch (error) {
    return null;
  }
}

const FALLBACK_RESPONSE = {
  interpretation: '오늘은 신체리듬이 낮으니 휴식을 추천합니다. 내일은 더 활기찬 여행을 기대해보세요.',
  shortInterpretation: '휴식이 필요해요',
};

export async function POST(req: NextRequest) {
  try {
    const { physical, emotional, intellectual } = await req.json();
    const admin = await getAdminSettings();
    if (!admin) {
      return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
    }
    const prompt = `\n아래 바이오리듬 수치를 참고해서 오늘의 여행 컨디션을 한글로 2~3문장으로 해석해줘.\n\n신체: ${physical}, 감정: ${emotional}, 지성: ${intellectual}\n`;
    const shortPrompt = `\n아래 바이오리듬 수치를 참고해서 오늘의 여행 컨디션을 한글로 20자 이내로 아주 짧게 요약해줘.\n\n신체: ${physical}, 감정: ${emotional}, 지성: ${intellectual}\n`;
    const aiResult = await callAIModel({ prompt, model: admin.text_model, apiKey: admin.text_model_apikey });
    const shortResult = await callAIModel({ prompt: shortPrompt, model: admin.text_model, apiKey: admin.text_model_apikey });
    if (!aiResult || !shortResult) {
      return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
    }
    return NextResponse.json({ interpretation: aiResult, shortInterpretation: shortResult }, { status: 200 });
  } catch (error) {
    // console.error(error); // 실제 운영 시 에러 로그를 남기는 것이 좋습니다.
    return NextResponse.json(FALLBACK_RESPONSE, { status: 200 });
  }
} 