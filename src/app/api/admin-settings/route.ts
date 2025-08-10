import { NextRequest, NextResponse } from 'next/server';
import { getAdminSettings, clearAdminSettingsCache } from '@/lib/adminSettingsCache';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    // 캐시 클리어 요청이 있으면 캐시 무효화
    const url = new URL(req.url);
    if (url.searchParams.has('clearCache')) {
      clearAdminSettingsCache();
    }
    
    // AI 관련 설정은 .env에서
    const aiSettings = await getAdminSettings();
    // 이미지/타이틀은 DB에서 최신값 (관리자 대시보드와 동일한 itemId 사용)
    const ADMIN_ITEM_ID = '585881f1-4065-4b11-812c-745800cee069';
    const { data, error } = await supabase
      .from('travel_destination')
      .select('title, imageUrl')
      .eq('id', ADMIN_ITEM_ID)
      .single();
    
    //console.log('[API] travel_destination 쿼리 결과:', { data, error });
    
    if (error) {
      //console.error('[API] DB 쿼리 에러:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    const result = {
      ...aiSettings,
      title: data?.title || aiSettings.title,
      imageUrl: data?.imageUrl || aiSettings.imageUrl,
    };
    
    //console.log('[API] 최종 반환 데이터:', result);
    
    // 통합 반환
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 