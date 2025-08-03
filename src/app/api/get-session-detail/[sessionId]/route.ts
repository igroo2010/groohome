import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  //console.log('API sessionId:', sessionId);
  const { data, error } = await supabase
    .from('result_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();
  //console.log('API 쿼리 결과:', data, error);
  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Not found' }, { status: 404 });
  }
  return NextResponse.json(data);
} 