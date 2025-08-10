import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const steps: Array<{step: string, status: string, error?: string, data?: any}> = [];

  try {
    // Step 1: Import 테스트
    steps.push({step: '1. Import genkit', status: 'trying'});
    const { ai } = await import('@/ai/genkit');
    steps[0].status = 'success';

    // Step 2: getAdminSettings 테스트
    steps.push({step: '2. Import getAdminSettings', status: 'trying'});
    const { getAdminSettings } = await import('@/lib/adminSettingsCache');
    steps[1].status = 'success';

    // Step 3: getAdminSettings 호출 테스트
    steps.push({step: '3. Call getAdminSettings', status: 'trying'});
    const settings = await getAdminSettings();
    steps[2].status = 'success';
    steps[2].data = {
      text_model: settings.text_model || 'missing',
      text_model_apikey: settings.text_model_apikey ? 'exists' : 'missing',
      hasAI: !!ai,
    };

    // Step 4: AI generate 옵션 구성 테스트
    steps.push({step: '4. Setup AI options', status: 'trying'});
    const options = {
      model: settings.text_model,
      prompt: { text: 'Hello' },
      config: {
        responseModalities: ['TEXT'],
        apiKey: settings.text_model_apikey,
        temperature: 0.1
      },
    };
    steps[3].status = 'success';
    steps[3].data = { modelName: options.model, hasApiKey: !!options.config.apiKey };

    // Step 5: AI generate 호출 테스트
    steps.push({step: '5. Call ai.generate', status: 'trying'});
    const result = await ai.generate(options);
    steps[4].status = 'success';
    steps[4].data = { resultType: typeof result, hasText: !!result.text };

    return NextResponse.json({
      status: 'all_success',
      steps,
      finalResult: result.text || result?.output?.text || 'no text found'
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    
    return NextResponse.json({
      status: 'failed',
      steps,
      error: errorMessage,
      errorStack: errorStack,
      errorType: typeof error,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
