'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Heart,
  Link,
  MapPin,
  Repeat,
  DollarSign,
  TrainFront,
  Lightbulb,
} from 'lucide-react';
// import type { RecommendDestinationOutput } from '@/ai/flows/recommend-destination'; // 사용하지 않으므로 삭제
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import { format } from 'date-fns';



type Recommendation = {
  type: string;
  name: string;
  address: string;
  description?: string;
  preferenceScore?: number;
};

type ResultCardProps = {
  persona: {
    personaName: string;
    description: string;
    destination: string;
    imageUrl: string;
    recommendations: Recommendation[];
    budget: string;
    transport: string;
    tip: string;
    likes?: number;
    id: string;
    email: string;
    birth_date: string;
  };
  onReset: () => void;
  isMine?: boolean;
  mySessionId?: string;
  onGoToMyResult?: () => void;
  children?: React.ReactNode;
};

// 여행 경비/교통편 줄바꿈 분리 함수
function splitLines(text: string) {
  if (!text) return [];
  // 주요 항목 키워드 기준으로 분리
  return text.split(/(?=숙박:|식비:|액티비티:|총 1박 기준:|비행:|시내:)/g);
}



// budget 정보 표시
function BudgetWithExchange({ budget }: { budget: string }) {
  return (
    <div>
      {budget.split('\n').map((line: string, idx: number) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
}



export function ResultCard({ persona, onReset, isMine = false, mySessionId, onGoToMyResult, children }: ResultCardProps) {
  const [activeAddress, setActiveAddress] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false); // 오늘 좋아요 여부
  const [isLiking, setIsLiking] = useState(false); // 로딩 상태
  const [likeCount, setLikeCount] = useState(persona.likes || 0); // 좋아요 수(추가)
  const { toast } = useToast();

  // 오늘 날짜 key 생성
  const today = format(new Date(), 'yyyy-MM-dd');
  const likeKey = `like-${persona.destination}-${today}`;

  // persona.likes 값이 변경될 때 카운터 초기화
  useEffect(() => {
    setLikeCount(persona.likes || 0);
  }, [persona.likes]);

  // 초기 렌더링: 로컬스토리지 우선 적용, 서버 동기화 후 덮어쓰기
  useEffect(() => {
    let ignore = false;
    let toastShown = false;
    
    // 로컬스토리지 우선 적용
    const localLiked = typeof window !== 'undefined' ? localStorage.getItem(likeKey) === 'true' : false;
    setHasLiked(localLiked);
    
    async function checkAlreadyLiked() {
      try {
        // sessionId가 있으면 추가로 전달
        const url = persona.id 
          ? `/api/like-destination?destination=${encodeURIComponent(persona.destination)}&sessionId=${persona.id}`
          : `/api/like-destination?destination=${encodeURIComponent(persona.destination)}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('서버 오류');
        const data = await res.json();
        if (!ignore) {
          setHasLiked(!!data.alreadyLiked);
          // 서버에서 받은 좋아요 수가 있고, persona.likes와 다른 경우에만 업데이트
          if (typeof data.likes === 'number' && data.likes !== (persona.likes || 0)) {
            setLikeCount(data.likes);
          }
          // 서버값이 true면 로컬스토리지에도 true 저장, 아니면 삭제
          if (typeof window !== 'undefined') {
            if (data.alreadyLiked) localStorage.setItem(likeKey, 'true');
            else localStorage.removeItem(likeKey);
          }
        }
      } catch {
        if (!ignore && !toastShown) {
          toastShown = true;
        }
      }
    }
    
    checkAlreadyLiked();
    return () => { ignore = true; };
  }, [persona.destination, persona.likes, persona.id, likeKey, toast]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast({
          title: '링크 복사 완료',
          description: '클립보드에 링크가 복사되었습니다.',
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: '복사 실패',
          description: '링크를 복사하는 데 실패했습니다.',
          variant: 'destructive',
        });
      }
    );
  };

  const handleLike = async () => {
    if (isLiking || hasLiked) return;
    setIsLiking(true);
    setHasLiked(true); // Optimistic UI
    setLikeCount(likeCount + 1);
    if (typeof window !== 'undefined') localStorage.setItem(likeKey, 'true');
    try {
      const response = await fetch('/api/like-destination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: persona.destination,
          id: persona.id,
          email: persona.email,
          birth_date: persona.birth_date,
          sessionId: persona.id, // sessionId 추가
        }),
      });
      const data = await response.json();
      if (response.ok && data.liked) {
        setHasLiked(true);
        setLikeCount(data.likes);
        if (typeof window !== 'undefined') localStorage.setItem(likeKey, 'true');
        toast({ title: '좋아요 성공!', description: '이 여행지를 좋아해주셔서 감사합니다.' });
      } else if (response.ok && !data.liked) {
        setHasLiked(false);
        setLikeCount(data.likes);
        if (typeof window !== 'undefined') localStorage.removeItem(likeKey);
        toast({ title: '좋아요 취소', description: '좋아요가 취소되었습니다.' });
      } else {
        setHasLiked(false);
        setLikeCount(prev => Math.max(prev - 1, 0));
        if (typeof window !== 'undefined') localStorage.removeItem(likeKey);
        toast({ title: '좋아요 실패', description: data.error || '좋아요 처리 중 오류가 발생했습니다.', variant: 'destructive' });
      }
    } catch {
      setHasLiked(false);
      setLikeCount(prev => Math.max(prev - 1, 0));
      if (typeof window !== 'undefined') localStorage.removeItem(likeKey);
      toast({ title: '네트워크 오류', description: '좋아요 처리 중 네트워크 오류가 발생했습니다.', variant: 'destructive' });
    } finally {
      setIsLiking(false);
    }
  };



  return (
    <Card className="w-full max-w-xl mx-auto shadow-2xl overflow-hidden border-2 border-primary/20 min-h-[600px]">
      <div className="relative w-full h-80 sm:h-96">
        {persona.imageUrl && typeof persona.imageUrl === 'string' ? (
          <Image
            src={persona.imageUrl}
            alt={`AI generated image for ${persona.destination}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            data-ai-hint="travel destination"
            unoptimized
          />
        ) : null}
      </div>
      <CardContent className="p-6 sm:p-8 bg-card min-h-[72px]">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent font-body">
            Your Travel Persona
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black font-headline">
            {persona?.personaName
              ? (persona.personaName.length > 10 ? `${persona.personaName.slice(0, 10)}...` : persona.personaName)
              : 'No name'}
          </h1>
        </div>
        <p className="mt-6 text-left text-muted-foreground text-sm font-body">
          {persona.description}
        </p>   
        <Separator className="my-8" />
        <div>
          <h3 className="text-center text-2xl font-bold mb-6 font-headline">
            &apos;{persona.destination}&apos; Recommended Courses
          </h3>
          <div className="space-y-2">
            {Array.isArray(persona.recommendations) && persona.recommendations.length > 0 ? (
              persona.recommendations.map((rec: Recommendation, idx: number) => (
                <div key={idx}>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-secondary/50 transition-colors">
                    <div>
                      <p className="text-xs text-muted-foreground">{rec.type}</p>
                      <p className="font-semibold">{rec.name}</p>
                      {rec.description && (
                        <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-accent font-semibold bg-accent/10 rounded px-2 py-1 mr-2">
                        Preference: {rec.preferenceScore}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setActiveAddress(activeAddress === idx ? null : idx)}
                        className="rounded-full h-8 w-8"
                      >
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {activeAddress === idx && (
                    <div className="p-3 bg-secondary/30 rounded-b-lg text-sm text-muted-foreground -mt-2">
                      <p>{rec.address}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">No course information available</div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-accent/10 p-2 rounded-full shrink-0">
              <DollarSign className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h4 className="font-bold">Travel Budget</h4>
              <div className="text-muted-foreground text-sm mt-1">
                {persona.budget ? <BudgetWithExchange budget={persona.budget} /> : <span>No information</span>}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-accent/10 p-2 rounded-full shrink-0">
              <TrainFront className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h4 className="font-bold">Transportation</h4>
              <div className="text-muted-foreground text-sm mt-1">
                {persona.transport ? splitLines(persona.transport).map((line, idx) => (
                  <div key={idx}>{line.trim()}</div>
                )) : <span>No information</span>}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-accent/10 p-2 rounded-full shrink-0">
              <Lightbulb className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h4 className="font-bold">Travel Tips</h4>
              <div className="text-muted-foreground text-sm mt-1">
                {persona.tip ? persona.tip.split('\n').map((line, idx) => (
                  <div key={idx}>{line.trim()}</div>
                )) : <span>No information</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={handleCopyLink}>
            <Link className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full w-12 h-12 transition-all duration-300 ${hasLiked ? 'scale-110' : ''}`}
            onClick={handleLike}
            disabled={hasLiked || isLiking}
            aria-label={hasLiked ? 'You already liked today' : 'Like'}
          >
            <Heart className={hasLiked ? 'w-5 h-5 fill-red-500 text-red-500 transition-all duration-300' : 'w-5 h-5'} />
            {isLiking && <span className="ml-1 animate-spin">...</span>}
          </Button>
          <span className="ml-2 text-lg font-bold align-middle">{likeCount}</span>
        </div>
        
        <Separator className="my-8" />
        
        {children}
        <div className="mt-10 flex justify-center">
          {isMine ? (
            // 내 결과일 때: 처음부터 다시
            <Button onClick={() => onReset()} variant="default" size="lg" className="rounded-full">
              <Repeat className="mr-2 h-5 w-5" />
              Start Again
            </Button>
          ) : (
            // 다른 사람 결과일 때: 두 개 버튼
            <div className="flex gap-4">
              <Button onClick={() => onReset()} variant="default" size="lg" className="rounded-full">
                <Repeat className="mr-2 h-5 w-5" />
                Start Again
              </Button>
              {mySessionId && onGoToMyResult && (
                <Button 
                  onClick={onGoToMyResult} 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full"
                >
                  My Result
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}