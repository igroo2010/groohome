import {genkit} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// 전역 타입 확장
declare global {
  var __GENKIT_INITIALIZED__: boolean | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __GENKIT_AI: any;
}

// 중복 모델 등록 방지: globalThis 플래그 사용
if (!globalThis.__GENKIT_INITIALIZED__) {
  globalThis.__GENKIT_AI = genkit({
    plugins: [
      googleAI({
        models: [
          'googleai/gemini-2.0-flash',
          'googleai/gemini-2.0-flash-preview-image-generation',
        ],
      }),
    ],
    // Firebase 없이 사용하는 설정
    enableTracingAndMetrics: false, // 텔레메트리 비활성화로 Firebase 의존성 제거
    flowStateStore: 'none', // Firebase Flow State Store 비사용
  });
  globalThis.__GENKIT_INITIALIZED__ = true;
}
export const ai = globalThis.__GENKIT_AI;