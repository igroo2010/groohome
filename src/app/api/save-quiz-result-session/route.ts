export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch'; // node 환경에서 필요

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service Role Key 사용
);

async function uploadExternalImageToStorage(imageUrl: string, fileName: string) {
  // 1. 외부 이미지 다운로드
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error('이미지 다운로드 실패');
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 2. Storage 업로드 (중복 방지: upsert)
  const { data, error } = await supabase.storage
    .from('result-images')
    .upload(`ai/${fileName}`, buffer, { contentType: 'image/png', upsert: true });

  if (error) throw new Error('Storage 업로드 실패: ' + error.message);

  // 3. public URL 획득
  const { data: urlData } = supabase.storage
    .from('result-images')
    .getPublicUrl(`ai/${fileName}`);

  return urlData.publicUrl;
}

// ip로 지역(city) 정보를 가져오는 함수
const detectCity = async (ip: string): Promise<string> => {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data: any = await response.json();
  console.log('ipapi.co 응답:', data); // ← 이 줄 추가
  let region = data.region || '';
  let city = data.city || '';
  //console.log('detectCity region:', region, 'city:', city); // region, city 콘솔 출력

  // 한국 지역만 한글 변환, 외국은 그대로 영어
  const koreanRegions = [
    'Busan', 'Seoul', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan',
    'Gyeonggi-do', 'Gangwon-do', 'Chungcheongbuk-do', 'Chungcheongnam-do',
    'Jeollabuk-do', 'Jeollanam-do', 'Gyeongsangbuk-do', 'Gyeongsangnam-do', 'Jeju-do'
  ];
  const cityMap: Record<string, string> = {
    'Suyeong': '수영',
    'Haeundae': '해운대',
    'Dongnae': '동래',
    'Jung': '중',
    'Seo': '서',
    'Yeonje': '연제',
    'Nam': '남',
    'Buk': '북',
    'Saha': '사하',
    'Sasang': '사상',
    'Geumjeong': '금정',
    'Busanjin': '부산진',
    // 필요시 추가
  };
  if (koreanRegions.includes(region)) {
    if (region === 'Busan') region = '부산';
    if (region === 'Seoul') region = '서울';
    if (region === 'Daegu') region = '대구';
    if (region === 'Incheon') region = '인천';
    if (region === 'Gwangju') region = '광주';
    if (region === 'Daejeon') region = '대전';
    if (region === 'Ulsan') region = '울산';
    if (region === 'Gyeonggi-do') region = '경기도';
    if (region === 'Gangwon-do') region = '강원도';
    if (region === 'Chungcheongbuk-do') region = '충청북도';
    if (region === 'Chungcheongnam-do') region = '충청남도';
    if (region === 'Jeollabuk-do') region = '전라북도';
    if (region === 'Jeollanam-do') region = '전라남도';
    if (region === 'Gyeongsangbuk-do') region = '경상북도';
    if (region === 'Gyeongsangnam-do') region = '경상남도';
    if (region === 'Jeju-do') region = '제주도';
    // city 한글 변환
    if (city.endsWith('-gu')) {
      const base = city.replace('-gu', '');
      city = (cityMap[base] || base) + '구';
    }
    if (city.endsWith('-si')) {
      const base = city.replace('-si', '');
      city = (cityMap[base] || base) + '시';
    }
    if (city.endsWith('-gun')) {
      const base = city.replace('-gun', '');
      city = (cityMap[base] || base) + '군';
    }
  }
  if (region && city) return `${region} - ${city}`;
  if (region) return region;
  if (city) return city;
  return '';
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { email, birth_date, quiz_answers, ai_result, image_url, ip, location: clientLocation } = body;
    let location = clientLocation || 'local';
    console.log('받은 ip:', ip);
    if (!clientLocation && ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const locationResult = await detectCity(ip); // 지역 전체 문자열 반환
        location = locationResult || 'local';
      } catch (e) {
        // ignore
      }
    }
    console.log('location:', location);
    const now = new Date();
    const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const created_at = kst.toISOString().replace('Z', '+09:00');

    // 외부 image_url이면 Storage에 업로드 후 publicUrl로 대체
    if (image_url) {
      if (/^https?:\/\//.test(image_url)) {
        try {
         // console.log('이미지 다운로드 시도:', image_url);
          // 파일명: uuid + 확장자
          const fileName = `${uuidv4()}.png`;
          const response = await fetch(image_url);
        //  console.log('다운로드 응답:', response.status);
          if (!response.ok) throw new Error('이미지 다운로드 실패');
          const arrayBuffer = await response.arrayBuffer();
        //  console.log('arrayBuffer 길이:', arrayBuffer.byteLength);
          const buffer = Buffer.from(arrayBuffer);
        //  console.log('Buffer 변환 완료, 업로드 시도');
          const { data, error } = await supabase.storage
            .from('result-images')
            .upload(`ai/${fileName}`, buffer, { contentType: 'image/png', upsert: true });
          if (error) {
            console.error('Storage 업로드 실패:', error);
          } else {
            console.log('Storage 업로드 성공:', data);
            // 3. public URL 획득
            const { data: urlData } = supabase.storage
              .from('result-images')
              .getPublicUrl(`ai/${fileName}`);
            image_url = urlData.publicUrl;
          }
        } catch (e) {
          // 업로드 실패 시 원본 URL 그대로 저장(또는 에러 반환)
          console.error('이미지 Storage 업로드 실패:', e);
        }
      } else if (/^data:image\/.+;base64,/.test(image_url)) {
        // base64 데이터 업로드 로직
        try {
         // console.log('base64 이미지 업로드 시도');
          const fileName = `${uuidv4()}.png`;
          const base64Data = image_url.split(',')[1];
          const buffer = Buffer.from(base64Data, 'base64');
          const { data, error } = await supabase.storage
            .from('result-images')
            .upload(`ai/${fileName}`, buffer, { contentType: 'image/png', upsert: true });
          if (error) {
            console.error('base64 Storage 업로드 실패:', error);
          } else {
         //   console.log('base64 Storage 업로드 성공:', data);
            const { data: urlData } = supabase.storage
              .from('result-images')
              .getPublicUrl(`ai/${fileName}`);
            image_url = urlData.publicUrl;
          }
        } catch (e) {
          console.error('base64 이미지 Storage 업로드 실패:', e);
        }
      }
    }

    // ai_result에서 destinationName(여행지명)만 recommended_destination에 저장
    let recommendedDestination = null;
  //  console.log('[DEBUG] ai_result 원본:', ai_result);
    if (ai_result) {
      let parsed = ai_result;
      if (typeof ai_result === 'string') {
        try {
          parsed = JSON.parse(ai_result);
        } catch {}
      }
     // console.log('[DEBUG] ai_result 파싱 결과:', parsed);
  //    console.log('[DEBUG] parsed.destinationName:', parsed.destinationName);
      if (parsed.destinationName) {
        recommendedDestination = parsed.destinationName;
      } else {
        console.error('[ERROR] ai_result에 destinationName 필드가 없습니다:', parsed);
      }
    }
    // recommendedDestination이 없으면 'unknown'으로 저장
    if (!recommendedDestination) recommendedDestination = 'unknown';
 //   console.log('[DEBUG] recommendedDestination 최종값:', recommendedDestination);
    //console.log('ai_result:', ai_result);
    //console.log('recommendedDestination:', recommendedDestination);

    const insertPayload = {
      id: uuidv4(),
      email,
      birth_date,
      quiz_answers,
      ai_result,
      created_at,
      ip,
      location,
      likes: 0,
      liked_ips: [],
      image_url, // Storage publicUrl 또는 원본 URL
      recommended_destination: recommendedDestination,
    };
 //   console.log('[DEBUG] DB insert payload:', insertPayload);
    const { error } = await supabase
      .from('result_sessions')
      .insert([insertPayload]);
    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
} 