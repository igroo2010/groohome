'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/components/ClientOnly';

type ResultSessionRow = {
  id: string;
  email: string;
  birth_date: string;
  ai_result: { destination?: string; recommended_destination?: string } | null;
  recommended_destination?: string;
  location?: string;
  likes: number;
  created_at: string;
};

interface SessionRow {
  id: string;
  email: string;
  birth_date: string;
  ai_result: { destination?: string } | null;
  likes: number;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [resultSessions, setResultSessions] = useState<ResultSessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemId] = useState('585881f1-4065-4b11-812c-745800cee069');

  useEffect(() => {
    // 세션 체크: 로그인 안 되어 있으면 로그인 페이지로 이동
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/admin');
      }
    });
    fetchResultSessions();
    // title, imageUrl 불러오기
    const fetchTitleAndImage = async () => {
      const { data, error } = await supabase
        .from('travel_destination')
        .select('title, imageUrl')
        .eq('id', itemId)
        .single();
      if (data) {
        setTitle(data.title || '');
        setImageUrl(data.imageUrl || '');
      }
    };
    fetchTitleAndImage();
  }, [router, itemId]);

  const fetchResultSessions = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('result_sessions')
      .select('id, email, birth_date, ai_result, recommended_destination, location, likes, created_at')
      .order('created_at', { ascending: false });
    if (error) {
      setError('세션 데이터를 불러오는 데 실패했습니다.');
      setResultSessions([]);
    } else {
      setResultSessions(
        (data as any[]).map(row => ({
          ...row,
          ai_result: row.ai_result || {},
          recommended_destination: row.recommended_destination || '-',
          location: row.location || '-',
        }))
      );
    }
    setLoading(false);
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/admin');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const renamedFile = new File([file], `image.${ext}`, { type: file.type });
      setSelectedFile(renamedFile);
    }
  };

  const handleUpload = async () => {

    if (!selectedFile) {
  
      return;
    }
    setUploading(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    const { data: { user } } = await supabase.auth.getUser();
  //console.log('user 전체:', user);
  //console.log('업로드 시도 userId:', user?.id);

    const formData = new FormData();
    formData.append('file', selectedFile);
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
      headers: accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {},
    });
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { error: '서버에서 올바른 JSON을 반환하지 않았습니다.' };
    }
    if (response.ok && data.imageUrl) {
      // 타임스탬프 없이 이미지 URL 설정
      setImageUrl(data.imageUrl);
      setSelectedFile(null);
    } else {
     //alert('업로드 실패: ' + (data.error || '서버 오류, 콘솔/관리자에게 문의하세요.'));
      console.error('이미지 업로드 실패:', data.error);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    // title, imageUrl 둘 중 하나라도 값이 있으면 저장
    if (!title && !imageUrl) {
      alert('타이틀 또는 이미지를 입력/업로드하세요.');
      return;
    }
    const upsertData: any = { id: itemId };
    if (title) upsertData.title = title;
    if (imageUrl) upsertData.imageUrl = imageUrl;
    const { error } = await supabase
      .from('travel_destination')
      .upsert([upsertData]);
    if (error) {
      alert('저장 실패: ' + error.message);
    } else {
      alert('저장되었습니다.');
      // 저장 후 최신값 다시 불러오기
      const { data } = await supabase
        .from('travel_destination')
        .select('title, imageUrl')
        .eq('id', itemId)
        .single();
      if (data) {
        setTitle(data.title || '');
        setImageUrl(data.imageUrl || '');
      }
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <header className="mb-8 text-center relative">
          <h1 className="text-3xl font-bold mb-2">WanderPersona 관리자 대시보드</h1>
          <p className="text-gray-500">AI 모델/프롬프트 관리, 통계, 세션 조회</p>
          <Button
            onClick={handleLogout}
            className="absolute right-0 top-0 bg-[#C4A4A4] text-white px-4 py-2 rounded font-semibold hover:bg-[#B784A7]"
          >
            로그아웃
          </Button>
        </header>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* 통계 */}
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">이용 통계</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[180px] bg-gray-100 rounded p-4 text-center">
                <div className="text-2xl font-bold">{resultSessions.length}</div>
                <div className="text-gray-500 mt-1">총 세션 수</div>
              </div>
              <div className="flex-1 min-w-[180px] bg-gray-100 rounded p-4 text-center">
                <div className="text-2xl font-bold">{resultSessions.reduce((sum, s) => sum + (s.likes || 0), 0)}</div>
                <div className="text-gray-500 mt-1">총 좋아요 수</div>
              </div>
              <div className="flex-1 min-w-[180px] bg-gray-100 rounded p-4 text-center">
                <div className="text-2xl font-bold">{
                  Array.from(new Set(resultSessions.map(s => s.ai_result?.destination || ''))).filter(Boolean).length
                }</div>
                <div className="text-gray-500 mt-1">여행지 종류</div>
              </div>
            </div>
          </section>
          {/* 세션 리스트 */}
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">세션/이용자 리스트</h2>
            {loading ? (
              <div className="text-center text-gray-500 py-8">불러오는 중...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-3 py-2 border">이메일</th>
                      <th className="px-3 py-2 border">생년월일</th>
                      <th className="px-3 py-2 border">추천 여행지</th>
                      <th className="px-3 py-2 border">사용자 위치</th>
                      <th className="px-3 py-2 border">좋아요</th>
                      <th className="px-3 py-2 border">생성일</th>
                      <th className="px-3 py-2 border">링크보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultSessions.map(resultSession => (
                      <tr key={resultSession.id}>
                        <td className="px-3 py-2 border text-center">{resultSession.email}</td>
                        <td className="px-3 py-2 border text-center">{resultSession.birth_date}</td>
                        <td className="px-3 py-2 border text-center">{resultSession.recommended_destination || '-'}</td>
                        <td className="px-3 py-2 border text-center">{resultSession.location || '-'}</td>
                        <td className="px-3 py-2 border text-center">{resultSession.likes}</td>
                        <td className="px-3 py-2 border text-center">{resultSession.created_at.slice(0, 10)}</td>
                        <td className="px-3 py-2 border text-center text-blue-600 cursor-pointer">보기</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">타이틀 및 이미지 업로드</h2>
            <div className="flex gap-8 w-full">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">타이틀</label>
                <Input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="타이틀을 입력하세요"
                  className="mb-6"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">이미지 업로드</label>
                <div className="flex gap-2 items-center w-full">
                  <Input
                    value={selectedFile ? '파일이 선택되었습니다' : imageUrl}
                    placeholder="이미지 URL 또는 파일 선택"
                    className="flex-1"
                    readOnly
                    onClick={() => document.getElementById('file-upload-hidden')?.click()}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="file-upload-hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                    className="h-10 px-6 bg-[#C4A4A4] text-white rounded font-semibold"
                  >
                    업로드
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleSave}
              className="h-10 w-full px-6 bg-[#C4A4A4] text-white rounded font-semibold"
              disabled={!title && !imageUrl}
            >
              저장
            </Button>
          </section>
        </div>
      </div>
    </ClientOnly>
  );
}
