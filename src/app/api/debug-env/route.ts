import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 보안: 개발 환경에서만 작동
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

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
