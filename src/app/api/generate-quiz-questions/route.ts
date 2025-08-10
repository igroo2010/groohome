import { NextRequest, NextResponse } from 'next/server';
import { getShuffledQuestions } from '@/components/quiz-questions';

export async function POST(req: NextRequest) {
  try {
    // 요청 데이터 파싱 (향후 AI 연동을 위해 유지)
    await req.json();
    // 실제 AI 연동 예시 (주석)
    // const { model, apiKey } = await req.json();
    // const aiQuestions = await callAIQuizAPI({ model, apiKey });
    // if (aiQuestions) return NextResponse.json({ questions: aiQuestions });
    
    // 현재는 고정된 퀴즈 데이터 반환
    return NextResponse.json({ questions: getShuffledQuestions() });
  } catch {
    // 에러 발생 시 기본 퀴즈 데이터 반환
    return NextResponse.json({ questions: getShuffledQuestions() });
  }
} 