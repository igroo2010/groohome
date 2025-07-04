'use client'; // 클라이언트 컴포넌트로 지정

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // 페이지 진입 시 localStorage에서 값 불러오기
  React.useEffect(() => {
    const savedId = localStorage.getItem('admin_id');
    const savedPw = localStorage.getItem('admin_pw');
    if (savedId && savedPw) {
      setId(savedId);
      setPw(savedPw);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: id,
        password: pw,
      });
      
      if (!error) {
        // 로그인 성공 처리
        if (remember) {
          localStorage.setItem('admin_id', id);
          localStorage.setItem('admin_pw', pw);
        } else {
          localStorage.removeItem('admin_id');
          localStorage.removeItem('admin_pw');
        }
        
        // 로그인 성공 직후 약간의 딜레이 후 user.id 콘솔 출력
        setTimeout(async () => {
          const { data: { user: loginUser } } = await supabase.auth.getUser();
          console.log('로그인 성공 후 user.id:', loginUser?.id);
        }, 1000);
        
        router.push('/admin/dashboard');
      } else {
        // 로그인 실패 처리
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('로그인 중 오류 발생:', err);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xs p-8 bg-white rounded shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">관리자 로그인</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={e => setId(e.target.value)}
            className="border rounded px-3 py-2"
            autoFocus
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="border rounded px-3 py-2"
            disabled={isLoading}
          />
          <label className="flex items-center gap-2 text-sm">
            <Checkbox 
              checked={remember} 
              onCheckedChange={v => setRemember(!!v)}
              disabled={isLoading}
            />
            아이디/비밀번호 저장
          </label>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-[#C4A4A4] text-white py-2 rounded font-semibold hover:bg-[#B784A7] w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}