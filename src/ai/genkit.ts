import {genkit} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// 중복 모델 등록 방지: globalThis 플래그 사용
if (!(globalThis as any).__GENKIT_INITIALIZED__) {
  (globalThis as any).__GENKIT_AI = genkit({
    plugins: [
      googleAI({
        models: [
          'googleai/gemini-2.0-flash',
          'googleai/gemini-2.0-flash-preview-image-generation',
        ],
      }),
    ],
  });
  (globalThis as any).__GENKIT_INITIALIZED__ = true;
}
export const ai = (globalThis as any).__GENKIT_AI;