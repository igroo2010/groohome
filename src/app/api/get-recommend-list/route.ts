import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  // result_sessions 테이블에서 좋아요순 15개 추천 리스트 반환 (중복 키워드 제거)
  const excludeId = req.nextUrl?.searchParams?.get('excludeId');
  const excludeBirthDate = req.nextUrl?.searchParams?.get('excludeBirthDate');
  const excludeEmail = req.nextUrl?.searchParams?.get('excludeEmail');
  const { data, error } = await supabase
    .from('result_sessions')
    .select('id, recommended_destination, likes, birth_date, email')
    .order('likes', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 1. recommended_destination 값이 있는 것만
  let list = (data || []).filter(
    row => row.recommended_destination && row.recommended_destination !== 'unknown'
  );

  // 2. 중복 여행지명은 likes가 가장 높은 것만
  const uniqueMap = new Map();
  for (const row of list) {
    const prev = uniqueMap.get(row.recommended_destination);
    if (!prev || row.likes > prev.likes) {
      uniqueMap.set(row.recommended_destination, row);
    }
  }
  list = Array.from(uniqueMap.values());

  // excludeId로 한 번 더 필터링 (slice 전에)
  if (excludeId) {
    list = list.filter(item => String(item.id) !== String(excludeId));
  }
  // 같은 생년월일+이메일도 제외, 단 Top 3(좋아요순)에는 포함
  if (excludeBirthDate && excludeEmail) {
    // Top 3 추출
    const top3 = list.slice(0, 3);
    const top3Set = new Set(top3.map(item => `${item.birth_date}__${item.email}`));
    const myKey = `${excludeBirthDate}__${excludeEmail}`;
    list = list.filter(item => {
      const key = `${item.birth_date}__${item.email}`;
      // 내 birth_date+email이면 제외, 단 Top 3에 있으면 포함
      if (key === myKey) {
        return top3Set.has(key);
      }
      return true;
    });
  }

  // 4. 최대 15개만
  list = list.slice(0, 15);
  //console.log('final list (최종 반환 리스트):', list);

  return NextResponse.json(list);
} 