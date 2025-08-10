import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 환경변수 확인용 로그 (여기에 추가!)
//console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
//console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
//console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // 1. 인증 필수
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ 
      error: '인증 토큰이 필요합니다. Bearer 토큰을 포함해 주세요.',
      code: 'NO_AUTH',
      authenticated: false
    }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
    return NextResponse.json({ 
      error: '인증에 실패했습니다. 유효하지 않은 토큰입니다.',
      code: 'AUTH_FAILED',
      authenticated: false
    }, { status: 401 });
  }
  const userId = user.id;

  const formData = await req.formData();
  let file = formData.get('file') as File | null;
  if (!file) {
    file = formData.get('image') as File | null;
  }

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // 2. .jpg 확장자만 허용
  const fileName = file.name;
  if (!fileName.toLowerCase().endsWith('.jpg') && !fileName.toLowerCase().endsWith('.jpeg')) {
    return NextResponse.json({ error: 'jpg 파일만 업로드할 수 있습니다.' }, { status: 400 });
  }

  // 3. public 폴더에 user_id 서브폴더로 저장
  const filePath = `public/${userId}/image.jpg`;
  
  //console.log('userId:', userId);
  //console.log('filePath:', filePath);
  //console.log('file:', file);

  const { error: uploadError } = await supabase.storage
    .from('travel-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error('Supabase Storage Upload Error:', uploadError);
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // public URL 반환
  const { data: urlData } = supabase.storage
    .from('travel-images')
    .getPublicUrl(filePath);

  return NextResponse.json({ imageUrl: urlData.publicUrl }, { status: 200 });
}