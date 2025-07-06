import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { email, image_url } = await req.json();
  // email로 해당 세션 찾고 image_url만 업데이트
  const { error } = await supabase
    .from('result_sessions')
    .update({ image_url })
    .eq('email', email); // 또는 id 등 고유값 사용
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
} 