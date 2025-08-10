import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 임시: 프로덕션에서도 디버깅 허용 (문제 해결 후 제거 예정)

  const envDebug = {
    NODE_ENV: process.env.NODE_ENV,
    TEXT_MODEL: process.env.TEXT_MODEL ? '✅ 설정됨' : '❌ 누락',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? '✅ 설정됨' : '❌ 누락',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? '✅ 설정됨' : '❌ 누락',
    IMAGE_MODEL: process.env.IMAGE_MODEL ? '✅ 설정됨' : '❌ 누락',
    IMAGE_API_KEY: process.env.IMAGE_API_KEY ? '✅ 설정됨' : '❌ 누락',
    // API 키 앞 4자리만 표시 (보안)
    GEMINI_KEY_PREFIX: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 4) + '...' : 'null',
  };

  return NextResponse.json(envDebug);
}
