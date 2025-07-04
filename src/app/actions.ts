'use server';

import {
  recommendDestination,
  RecommendDestinationInput,
  RecommendDestinationOutput,
} from '@/ai/flows/recommend-destination';

export async function getRecommendedDestination(
  input: RecommendDestinationInput
): Promise<RecommendDestinationOutput> {
 // console.log('getRecommendedDestination 호출됨:', input)
  try {
    const result = await recommendDestination(input);
    return result;
  } catch (error) {
    console.error('Error recommending destination:', error);
    throw new Error(
      '추천 여행지를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요.'
    );
  }
}
