import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { getAdminSettings } from '@/lib/adminSettingsCache';

export async function GET(req: NextRequest) {
  try {
    // 1. 환경변수 확인
    const settings = await getAdminSettings();
    
    if (!settings.text_model || !settings.text_model_apikey) {
      return NextResponse.json({
        status: 'failed',
        error: 'Missing AI configuration',
        details: {
          text_model: settings.text_model ? '✅' : '❌',
          text_model_apikey: settings.text_model_apikey ? '✅' : '❌',
        }
      }, { status: 500 });
    }

    // 2. 간단한 AI 호출 테스트
    const testPrompt = 'Hello, respond with "AI is working"';
    
    const result = await ai.generate({
      model: settings.text_model,
      prompt: { text: testPrompt },
      config: {
        responseModalities: ['TEXT'],
        apiKey: settings.text_model_apikey,
        temperature: 0.1
      },
    });

    let responseText = '';
    if (typeof result.text === 'string') {
      responseText = result.text;
    } else if (result?.output?.text) {
      responseText = result.output.text;
    } else if (result?.output?.content) {
      responseText = result.output.content;
    }

    return NextResponse.json({
      status: 'success',
      aiResponse: responseText.trim(),
      model: settings.text_model,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json({
      status: 'failed',
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
