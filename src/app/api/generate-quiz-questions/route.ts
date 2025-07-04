import { NextRequest, NextResponse } from 'next/server';
import { getShuffledQuestions } from '@/components/quiz-questions';

export async function POST(req: NextRequest) {
  try {
    const { model, apiKey } = await req.json();
    // 실제 AI 연동 예시 (주석)
    // const aiQuestions = await callAIQuizAPI({ model, apiKey });
    // if (aiQuestions) return NextResponse.json({ questions: aiQuestions });
    // 실패 시 더미 데이터 반환
    return NextResponse.json({ questions: getShuffledQuestions(10) });
  } catch (e) {
    return NextResponse.json({ questions: getShuffledQuestions(10) });
  }
} 