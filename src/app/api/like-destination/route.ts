import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getClientIp, getToday, isLikedToday } from '@/lib/utils';

type LikedItem = {
  ip?: string;
  user_id?: string;
  date: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destination, email, birth_date, sessionId } = body; // sessionId 추가
    if (!destination) {
      return NextResponse.json({ error: 'Destination is required' }, { status: 400 });
    }

    // IP 및 userId 추출
    const ip = getClientIp(req);
    const today = getToday();
    let userId: string | undefined = undefined;
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(accessToken);
      userId = user?.id;
    }

    // row 찾기: sessionId가 있으면 해당 세션, 없으면 기존 로직
    let query = supabase
      .from('result_sessions')
      .select('id, likes, liked_ips, ai_result, email, birth_date');
    
    if (sessionId) {
      // 특정 세션 ID로 직접 조회
      query = query.eq('id', sessionId);
    } else {
      // sessionId가 없으면 기존 로직
      query = query.eq('recommended_destination', destination);
      
      // 인증된 사용자인 경우 본인 데이터 우선 조회
      if (userId) {
        query = query.eq('id', userId);
      } else if (email && birth_date) {
        query = query.eq('email', email).eq('birth_date', birth_date);
      } else {
        // email이나 birth_date가 없어도 해당 destination의 첫 번째 데이터를 가져옴
        query = query.limit(1);
      }
    }
    
    const { data: existingData, error: selectError } = await query.single();

    if (selectError && selectError.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existingData) {
      // 기존 데이터가 있는 경우 좋아요 토글 처리
      const currentLikes = existingData.likes || 0;
      let likedIps: LikedItem[] = existingData.liked_ips || [];
      const alreadyLiked = isLikedToday(likedIps, ip, userId);
      if (!alreadyLiked) {
        // 좋아요 +1, liked_ips에 추가
        likedIps.push(userId ? { user_id: userId, date: today } : { ip, date: today });
        const { error: updateError } = await supabase
          .from('result_sessions')
          .update({ 
            likes: currentLikes + 1,
            liked_ips: likedIps
          })
          .eq('id', existingData.id);
        if (updateError) {
          return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
        }
        return NextResponse.json({ 
          success: true, 
          liked: true,
          likes: currentLikes + 1,
          message: 'Like added successfully'
        }, { status: 200 });
      } else {
        // 좋아요 -1, liked_ips에서 제거
        likedIps = likedIps.filter((item: LikedItem) =>
          userId ? !(item.user_id === userId && item.date === today) : !(item.ip === ip && item.date === today)
        );
        const { error: updateError } = await supabase
          .from('result_sessions')
          .update({ 
            likes: Math.max(currentLikes - 1, 0),
            liked_ips: likedIps
          })
          .eq('id', existingData.id);
        if (updateError) {
          return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
        }
        return NextResponse.json({ 
          success: true, 
          liked: false,
          likes: Math.max(currentLikes - 1, 0),
          message: 'Like removed successfully'
        }, { status: 200 });
      }
    } else {
      // 새로운 여행지인 경우 기본 레코드 생성
      const { error: insertError } = await supabase
        .from('result_sessions')
        .insert({
          email: 'anonymous@wanderpersona.com',
          birth_date: '1990-01-01',
          quiz_answers: [],
          ai_result: { destination },
          likes: 1,
          liked_ips: [userId ? { user_id: userId, date: today } : { ip, date: today }],
          ip: ip,
          recommended_destination: destination
        });
      if (insertError) {
        return NextResponse.json({ error: 'Failed to create destination record' }, { status: 500 });
      }
      return NextResponse.json({ 
        success: true, 
        liked: true,
        likes: 1,
        message: 'Like added to new destination'
      }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination');
    const sessionId = searchParams.get('sessionId'); // 세션 ID 추가
    
    if (!destination) {
      return NextResponse.json({ error: 'Destination is required' }, { status: 400 });
    }
    
    const ip = getClientIp(req);
    let userId: string | undefined = undefined;
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(accessToken);
      userId = user?.id;
    }

    // 특정 세션 ID가 있으면 해당 세션의 데이터를 가져오기
    let query = supabase
      .from('result_sessions')
      .select('liked_ips, likes');
    
    if (sessionId) {
      query = query.eq('id', sessionId);
    } else {
      // sessionId가 없으면 기존 로직 (destination 기준)
      query = query.eq('recommended_destination', destination);
    }
    
    const { data: existingData, error: selectError } = await query.single();
    if (selectError && selectError.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
    
    const likedIps = existingData?.liked_ips || [];
    const alreadyLiked = isLikedToday(likedIps, ip, userId);
    const likes = existingData?.likes || 0;
    return NextResponse.json({ alreadyLiked, likes });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}