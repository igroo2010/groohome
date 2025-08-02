import { NextRequest, NextResponse } from 'next/server';
import { getAdminSettings } from '@/lib/adminSettingsCache';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    // AI 관련 설정은 .env에서
    const aiSettings = await getAdminSettings();
    // 이미지/타이틀은 DB에서 최신값
    const { data, error } = await supabase
      .from('travel_destination')
      .select('title, imageUrl')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // 통합 반환
    return NextResponse.json({
      ...aiSettings,
      title: data?.title || aiSettings.title,
      imageUrl: data?.imageUrl || aiSettings.imageUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 