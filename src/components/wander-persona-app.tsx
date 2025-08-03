'use client';

// React 관련
import React, { useState, useTransition, useEffect, useCallback, useRef } from 'react';

// Next.js 관련
import Image from 'next/image';

// 외부 라이브러리
import { format, isValid } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Calendar as CalendarIcon, Mail } from 'lucide-react';

// 내부 컴포넌트
import { BiorhythmDisplay } from '@/components/biorhythm-display';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Quiz } from '@/components/quiz';
import { getShuffledQuestions, type Question } from '@/components/quiz-questions';
import { ResultCard } from '@/components/result-card';
import RecommendList from './result/RecommendList';

// UI 컴포넌트
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// 훅
import { useToast } from '@/hooks/use-toast';

// 유틸리티 및 액션
import { getRecommendedDestination } from '@/app/actions';
import { calculateBiorhythm } from '@/lib/biorhythm';


// 타입
import type { RecommendDestinationOutput } from '@/ai/flows/recommend-destination';

// 타입 정의
type Stage = 'intro' | 'biorhythm' | 'quiz' | 'email' | 'loading_persona' | 'result';

// 인터페이스 정의
interface BirthDateInputProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  error: string | null;
  isPending: boolean;
  onDateSelect: (date: Date | undefined) => void;
}

interface EmailInputProps {
  value: string;
  onChange: (v: string) => void;
  privacyChecked: boolean;
  onPrivacyChange: (v: boolean) => void;
  onNext: () => void;
  isPending: boolean;
}

// 상수 정의
const DATE_FORMAT = {
  MAX_LENGTH: 8,
  MAX_DISPLAY_LENGTH: 10 // YYYY-MM-DD 형식
};

const YEAR_RANGE = {
  MIN: 1930,
  MAX: new Date().getFullYear()
};



// 1. 생년월일 입력 컴포넌트
function BirthDateInput({ 
  value, 
  onChange, 
  onNext, 
  error, 
  isPending, 
  onDateSelect 
}: BirthDateInputProps) {
  // 하이픈 자동 입력 핸들러
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d]/g, '');
    
    // 최대 길이 제한
    if (v.length > DATE_FORMAT.MAX_LENGTH) {
      v = v.slice(0, DATE_FORMAT.MAX_LENGTH);
    }
    
    // 하이픈 자동 삽입 로직
    let formattedValue = v;
    if (v.length >= 4) {
      formattedValue = v.slice(0, 4) + '-' + v.slice(4);
    }
    if (v.length >= 6) {
      formattedValue = v.slice(0, 4) + '-' + v.slice(4, 6) + '-' + v.slice(6);
    }
    
    onChange(formattedValue);
  };

  // 버튼 비활성화 조건
  const isButtonDisabled = !value || !!error || isPending;

  return (
    <div className="text-center w-full">
      <h1 className="text-2xl md:text-3xl font-black font-headline">
        Travel Persona
      </h1>
      <div className="w-full h-[1px] bg-gray-200 my-3" />
      <p className="mt-4 text-lg md:text-xm text-muted-foreground max-w-xl mx-auto">
        Discover your own special journey.
      </p>
      <div className="mt-8 flex flex-col items-center gap-2 w-full">
        <div className="flex w-full max-w-sm mx-auto items-center gap-2">
          <Input
            placeholder="YYYY-MM-DD"
            value={value}
            onChange={handleInput}
            disabled={isPending}
            maxLength={DATE_FORMAT.MAX_DISPLAY_LENGTH}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} size="icon" className="shrink-0">
                <CalendarIcon className="h-4 w-4" />
                <span className="sr-only">달력에서 날짜 선택</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={onDateSelect}
                captionLayout="dropdown-buttons"
                fromYear={YEAR_RANGE.MIN}
                toYear={YEAR_RANGE.MAX}
              />
            </PopoverContent>
          </Popover>
        </div>
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        <Button 
          onClick={onNext} 
          size="lg" 
          className="rounded-full px-10 py-6 text-lg w-full max-w-sm mt-4" 
          disabled={isButtonDisabled}
        >
          <Wand2 className="mr-3 h-6 w-6" />
          Find My Persona
        </Button>
      </div>
    </div>
  );
}

// 2. 이메일 입력 컴포넌트
function EmailInput({ 
  value, 
  onChange, 
  privacyChecked, 
  onPrivacyChange, 
  onNext, 
  isPending 
}: EmailInputProps) {
  // 버튼 비활성화 조건
  const isButtonDisabled = !value || !privacyChecked || isPending;

  // 체크박스 변경 핸들러 (타입 안전성 개선)
  const handlePrivacyChange = (checked: boolean | "indeterminate") => {
    onPrivacyChange(checked === true);
  };

  return (
    <>
      <Input
        type="email"
        placeholder="your.email@example.com"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="max-w-sm"
        disabled={isPending}
      />
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="privacy" 
          checked={privacyChecked} 
          onCheckedChange={handlePrivacyChange}
          disabled={isPending} 
        />
        <Label htmlFor="privacy" className="text-sm font-normal text-muted-foreground">
          I agree to the Privacy Policy.
        </Label>
      </div>
      <Button 
        onClick={onNext} 
        size="lg" 
        className="rounded-full px-10 py-6 text-lg w-full max-w-sm mt-2" 
        disabled={isButtonDisabled}
      >
        <Mail className="mr-3 h-6 w-6" />
        View Results
      </Button>
    </>
  );
}
// 5. 결과 컴포넌트: AI가 분석한 여행 페르소나/추천지 결과를 보여줌

// WanderPersonaApp: 전체 페르소나 생성 플로우를 관리하는 메인 컴포넌트
export function WanderPersonaApp({ initialSessionId }: { initialSessionId?: string }) {
  // ====== 상태 관리 ======
  // 각 단계(stage), 퀴즈 답변, 입력값, 결과 등 상태 관리
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [birthDate, setBirthDate] = useState<string>('');
  const [dateError, setDateError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [recommendedDestination, setRecommendedDestination] = useState<RecommendDestinationOutput | null>(null);
  const [isBiorhythmLoading, setIsBiorhythmLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [adminImageUrl, setAdminImageUrl] = useState<string | null>(null);
  const [adminTitle, setAdminTitle] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgLoadTimer = useRef<NodeJS.Timeout | null>(null);
  const [mySessionId, setMySessionId] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  // 타입 명확화
  interface ResultData {
    id?: string;
    personaName?: string;
    description?: string;
    destination?: string;
    imageUrl?: string;
    recommendations?: string[];
    budget?: string;
    transport?: string;
    tip?: string;
    likes?: number;
    ai_result?: any;
    image_url?: string;
  }
  const [resultData, setResultData] = useState<ResultData | null>(null);
  interface RecommendItem {
    id?: string;
    personaName?: string;
    destination?: string;
    imageUrl?: string;
  }
  const [recommendList, setRecommendList] = useState<RecommendItem[]>([]);
  const [view, setView] = useState<'main' | 'result'>('main');
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [imgNaturalHeight, setImgNaturalHeight] = useState<number | null>(null);
  const [cardWidth, setCardWidth] = useState(650);
  const [showBiorhythmContent, setShowBiorhythmContent] = useState(false);
  // 위치 정보 상태 추가
  const [userLocation, setUserLocation] = useState('');
  // 국가코드 상태 추가
  const [userCountryCode, setUserCountryCode] = useState('KR'); // 기본값: 한국

  // ====== 핸들러 함수들 ======
  // handleReset: 전체 상태 초기화
  const handleReset = useCallback(() => {
    setAnswers([]);
    setCurrentStep(0);
    setQuestions([]);
    setBirthDate('');
    setDateError(null);
    setEmail('');
    setPrivacyChecked(false);
    setRecommendedDestination(null);
    setIsBiorhythmLoading(false);
    setStage('intro');
    setIsLoadingResult(false);
    setResultData(null);
    setCurrentSessionId(null);
  }, []);

  // fetchQuizQuestions: 퀴즈 질문을 클라이언트에서 직접 생성
  const fetchQuizQuestions = async () => {
    // 불필요한 API 호출 제거하고 클라이언트에서 직접 질문 생성
    setQuestions(getShuffledQuestions());
  };

  // handleShowBiorhythm: 바이오리듬 분석 단계로 이동
  const handleShowBiorhythm = () => {
    if (birthDate && !dateError) {
      setStage('biorhythm');
    }
  };

  // handleStartQuiz: 퀴즈 시작
  const handleStartQuiz = async () => {
    await fetchQuizQuestions(); // 퀴즈 시작 전에 항상 새로 불러오기
    setCurrentStep(0);         // 인덱스도 0으로 초기화
    setStage('quiz');
  };

  // handleAnswer: 퀴즈 답변 처리
  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStage('email');
    }
  };

  // handleEmailSubmit: 이메일 입력 후 결과 생성 및 저장
  const handleEmailSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    if (!privacyChecked) {
      toast({
        title: 'Error',
        description: 'Please agree to the Privacy Policy.',
        variant: 'destructive',
      });
      return;
    }
    setStage('loading_persona');
    // 외부 IP 받아오기
    let ip = null;
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const data = await ipRes.json();
      ip = data.ip;
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Unable to retrieve external IP. Please check your network environment.',
        variant: 'destructive',
      });
      return; // 저장 중단
    }
    startTransition(async () => {
      if (!birthDate) {
        toast({
          title: 'Error',
          description: 'Birthdate information is missing. Please start over.',
          variant: 'destructive',
        });
        handleReset();
        return;
      }
      try {
        // AI 연동: 사용자의 퀴즈 답변과 바이오리듬을 기반으로 여행 페르소나/여행지 결과를 AI에게 요청합니다.
        const birth = new Date(birthDate);
        const today = new Date();
        const biorhythm = calculateBiorhythm(birth, today);
        const result = await getRecommendedDestination({
          birthDate: birthDate,
          quizAnswers: answers,
          physical: biorhythm.physical,
          emotional: biorhythm.emotional,
          intellectual: biorhythm.intellectual,
          perceptual: biorhythm.perceptual,
        });
        //console.log('[AI 결과]', result);
        setRecommendedDestination(result);
        // DB 저장: ai_result는 꼭 필요한 값만 추려서 저장
        const aiResultToSave = {
          personaTitle: result.personaTitle || '',
          analysis: result.analysis || '',
          budget: result.budget || 'No information',
          transport: result.transport || 'No information',
          tip: result.tip || 'No information',
          recommendations: result.recommendations || [],
          imageUrl: result.imageUrl || '',
          destinationName: result.destinationName || '',
        };
        // 위치 정보(userLocation)를 함께 저장
    
        const saveRes = await fetch('/api/save-quiz-result-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            birth_date: birthDate,
            quiz_answers: answers,
            ai_result: aiResultToSave,
            image_url: result.imageUrl,
            ip,
            location: userLocation, // ← 위치 주소 저장
          }),
        });
        if (!saveRes.ok) {
          throw new Error('DB 저장 실패');
        }
        const saveData: any = await saveRes.json();
    
        // DB에 저장된 publicUrl로 recommendedDestination의 imageUrl 갱신 (prev null 체크)
        setRecommendedDestination(prev => {
          if (!prev) return null;
          return {
            ...prev,
            imageUrl: saveData.image_url || prev.imageUrl || '',
            personaTitle: prev.personaTitle || '',
            destinationName: prev.destinationName || '',
            analysis: prev.analysis || '',
            shortAnalysis: prev.shortAnalysis || '',
            recommendations: prev.recommendations || [],
            budget: prev.budget || '',
            transport: prev.transport || '',
            tip: prev.tip || '',
          };
        });
        handleResultSave(saveData.sessionId, {
          ...result,
          imageUrl: saveData.image_url || result.imageUrl || '',
          ai_result: {
            ...result,
            imageUrl: saveData.image_url || result.imageUrl || '',
          },
          image_url: saveData.image_url || result.imageUrl || '',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: (error as Error).message || 'Unable to generate persona. Please try again.',
          variant: 'destructive',
        });
        handleReset();
      }
    });
  };

  // handleResultSave: 결과 저장 후 추천 리스트 불러오기
  const handleResultSave = (sessionId: string, data: any) => {
    setMySessionId(sessionId);
    setCurrentSessionId(sessionId);
    setResultData(data);
    setView('result');
    setTimeout(() => fetchRecommendList(sessionId, birthDate, email), 0);
  };

  // fetchRecommendList: 추천 리스트 불러오기
  const fetchRecommendList = async (excludeId?: string, excludeBirthDate?: string, excludeEmail?: string) => {
    const idToExclude = excludeId || mySessionId;
    const birthDateToExclude = excludeBirthDate || birthDate;
    const emailToExclude = excludeEmail || email;
    const params = new URLSearchParams();
    if (idToExclude) params.append('excludeId', idToExclude);
    if (birthDateToExclude) params.append('excludeBirthDate', birthDateToExclude);
    if (emailToExclude) params.append('excludeEmail', emailToExclude);
    const res = await fetch(`/api/get-recommend-list?${params.toString()}`);
    const list = await res.json();

    setRecommendList(list);
  };

  // handleOtherCardClick: 추천 리스트 클릭 시 상세 결과 보기
  const handleOtherCardClick = async (sessionId: string) => {
    setIsLoadingResult(true);
    setCurrentSessionId(sessionId);
    setView('result');
    const res = await fetch(`/api/get-session-detail/${sessionId}`);
    const data = await res.json();
    setResultData(data);
    fetchRecommendList(mySessionId ?? undefined, birthDate, email);
    setTimeout(() => setIsLoadingResult(false), 500); // 부드러운 전환을 위해 약간의 딜레이
  };

  // handleResetOrMyResult: 다시하기/내 결과로 전환
  const handleResetOrMyResult = async () => {
    setAnswers([]);
    setCurrentStep(0);
    await fetchQuizQuestions();
    setStage('quiz');
    setView('main');
    setResultData(null);
    setCurrentSessionId(null);
    setIsLoadingResult(false);
    // birthDate, recommendedDestination, email 등은 그대로 유지
  };

  // 이미지 로딩 핸들러 복원
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setImgNaturalHeight(img.naturalHeight);
    setImgLoaded(true);
  };
  // 이미지가 바뀔 때마다 imgLoaded 초기화
  useEffect(() => {
    setImgLoaded(false);
  }, [adminImageUrl, recommendedDestination?.imageUrl]);

  // IP 기반으로 미국 주(State) 정보를 가져오는 함수
  const fetchUserLocation = useCallback(async () => {

    try {
      // IP 기반 위치 정보 API 호출
  
      const res = await fetch('/api/ip-location');
      const data = await res.json();
      
      const { state, country, city } = data;
      if (state && state !== 'Unknown') {
        const locationText = city && city !== 'Unknown' ? `${city}, ${state}` : state;
        setUserLocation(locationText);
        setUserCountryCode(country || 'US');
    
      } else {
        setUserLocation('');
        setUserCountryCode('US');
    
      }
    } catch (e) {
      setUserLocation('');
      setUserCountryCode('US');
  
    }
  }, []);

  // 컴포넌트 마운트 시 위치 정보 요청
  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  // ====== useEffect 설명 ======
  // - 바이오리듬 분석 및 퀴즈 질문 미리 불러오기
  useEffect(() => {
    const fetchBiorhythmAnalysis = async () => {
      if (stage === 'biorhythm' && birthDate) {
        setIsBiorhythmLoading(true);
        // 바이오리듬 분석과 동시에 퀴즈 질문도 미리 fetch
        fetchQuizQuestions();
        try {
          const birth = new Date(birthDate);
          const today = new Date();
          const biorhythm = calculateBiorhythm(birth, today);
          // API 호출
          const res = await fetch('/api/biorhythm-interpret', {
            method: 'POST',
            body: JSON.stringify({
              physical: Math.round(biorhythm.physical * 100),
              emotional: Math.round(biorhythm.emotional * 100),
              intellectual: Math.round(biorhythm.intellectual * 100)
            }),
            headers: { 'Content-Type': 'application/json' }
          });
          const data = await res.json();
          const result = await getRecommendedDestination({
            birthDate: birthDate,
            quizAnswers: [],
            physical: biorhythm.physical,
            emotional: biorhythm.emotional,
            intellectual: biorhythm.intellectual,
            perceptual: biorhythm.perceptual,
          });
          //console.log('[recommendedDestination 전체]', result);
          setRecommendedDestination(result);
        } catch (error) {
          setRecommendedDestination({
            personaTitle: '',
            destinationName: '',
            imageUrl: '',
            analysis: 'AI 해석을 가져오는 데 실패했습니다.',
            shortAnalysis: '요약 실패',
            recommendations: [],
            budget: '',
            transport: '',
            tip: '',
            popularity: '',
          });
        } finally {
          setIsBiorhythmLoading(false);
        }
      }
    };
    fetchBiorhythmAnalysis();
  }, [stage, birthDate]);

  useEffect(() => {
    if (stage === 'biorhythm' && !isBiorhythmLoading && recommendedDestination) {
      setShowBiorhythmContent(false);
      setTimeout(() => setShowBiorhythmContent(true), 350); // 카드 리사이징 duration과 맞춤
    } else if (stage !== 'biorhythm') {
      setShowBiorhythmContent(false);
    }
  }, [stage, isBiorhythmLoading, recommendedDestination]);

  // - 각 단계별 콘솔 출력 및 관리자 이미지/타이틀 불러오기
  useEffect(() => {
    if (stage === 'quiz' && questions.length > 0) {
  
    }
    // 전체 페이지 주요 스테이지 콘솔 출력
    const stageNames: Record<string, string> = {
      intro: '메인(생년월일 입력)',
      biorhythm: '바이오리듬 분석',
      quiz: '퀴즈 진행',
      email: '이메일 입력',
      loading_persona: 'AI 결과 생성 중',
      result: '결과 페이지',
    };
    if (stage in stageNames) {
      //console.log(`[STAGE] ${stage}: ${stageNames[stage]}`);
    }
    // 이메일 입력 진입 시 관리자 이미지/타이틀 불러오기
    if (stage === 'email') {
      fetch('/api/admin-settings')
        .then(res => res.json())
        .then((data: any) => {
          setAdminImageUrl(data?.imageUrl || null);
          setAdminTitle(data?.title || null);
        })
        .catch(() => {
          setAdminImageUrl(null);
          setAdminTitle(null);
        });
    }
  }, [stage, currentStep, questions]);

  // cardWidth useEffect로 관리
  useEffect(() => {
    setCardWidth(stage === 'biorhythm' && isBiorhythmLoading ? 360 : 650);
  }, [stage, isBiorhythmLoading]);

  // ====== 렌더링 영역 ======
  // 컨텐츠 사이즈 조절
  const stageContentSizeMap: Record<Stage, { width: number, height: number }> = {
    intro: { width: 450, height: 350 },
    biorhythm: { width: 780, height: 780 },
    quiz: { width: 600, height: 530 },
    email: { width: 450, height: 980 },
    loading_persona: { width: 380, height: 300 },
    result: { width: 500, height: 600 },
  };
  const contentSize = stageContentSizeMap[stage];

  // view === 'result' : 결과/상세/추천 리스트 SPA 렌더링
  if (view === 'result') {
    // 디버깅용 콘솔 로그 추가
    //console.log('내 카드 resultData:', resultData);
    //console.log('내 카드 resultData.imageUrl:', resultData?.imageUrl);
    //console.log('내 카드 resultData.image_url:', resultData?.image_url);
    //console.log('내 카드 resultData.ai_result:', resultData?.ai_result);
    //console.log('내 카드 resultData.ai_result.imageUrl:', resultData?.ai_result?.imageUrl);
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoadingResult ? 'loading' : (resultData?.id || 'result')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {isLoadingResult ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-background/70">
              <div className="bg-card rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center">
                <LoadingSpinner title="Loading results..." description="Preparing results from other travelers." />
              </div>
            </div>
          ) : resultData ? (
            <div>
              <ResultCard
                persona={{
                  personaName: resultData.personaName || resultData.ai_result?.personaName || resultData.ai_result?.personaTitle || 'No information',
                  description: resultData.description || resultData.ai_result?.analysis || 'No information',
                  destination: resultData.destination || resultData.ai_result?.destinationName || 'No information',
                  imageUrl: resultData.imageUrl || resultData.ai_result?.imageUrl || '',
                  recommendations: resultData.recommendations || resultData.ai_result?.recommendations || [],
                  budget: resultData.budget || resultData.ai_result?.budget || '',
                  transport: resultData.transport || resultData.ai_result?.transport || '',
                  tip: resultData.tip || resultData.ai_result?.tip || '',
                  likes: resultData.likes,
                  id: '',
                  email: '',
                  birth_date: '',
                }}
                isMine={currentSessionId === mySessionId}
                mySessionId={mySessionId || undefined}
                onReset={handleResetOrMyResult}
              >
                <div>
                  <p className="text-center text-muted-foreground mb-4">Recommended keywords from other travelers</p>
                  <RecommendList
                    list={recommendList}
                    onSelect={id => {
                  
                      handleOtherCardClick(id);
                    }}
                  />
                </div>
              </ResultCard>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    );
  }

  // view !== 'result' 일 때만 stage별 분기 사용
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full transition-all duration-700 ease-in-out">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* 배경 카드 컨테이너 */}
              <div
                className="bg-card rounded-2xl shadow-xl flex flex-col justify-center items-center transition-all duration-700"
                style={{
                  width: contentSize.width,
                  minWidth: 320,
                  maxWidth: 800,
                  minHeight: (stage === 'email' && !adminImageUrl && !recommendedDestination?.imageUrl)
                    ? stageContentSizeMap['quiz'].height
                    : contentSize.height,
                  margin: '0 auto',
                  transition: 'width 0.3s, min-width 0.3s, max-width 0.3s',
                }}
              >
                {/* 컨텐츠 컨테이너 */}
                <div className="p-8 sm:p-12 w-full flex flex-col justify-center items-center">
                  {stage === 'intro' ? (
                    <BirthDateInput
                      value={birthDate}
                      onChange={setBirthDate}
                      onNext={handleShowBiorhythm}
                      error={dateError}
                      isPending={isPending}
                      onDateSelect={date => {
                        if (date) {
                          setBirthDate(format(date, 'yyyy-MM-dd'));
                          setDateError(null);
                        }
                      }}
                    />
                  ) : stage === 'biorhythm' && birthDate && !dateError && isValid(new Date(birthDate)) ? (
                    <BiorhythmDisplay
                      birthDate={new Date(birthDate)}
                      onStartQuiz={() => { handleStartQuiz(); }}
                      analysis={recommendedDestination?.analysis ?? null}
                      isLoading={isBiorhythmLoading}
                    />
                  ) : stage === 'quiz' ? (
                    <div className="w-full">
                      <Quiz
                        currentStep={currentStep}
                        onAnswer={handleAnswer}
                        questions={questions}
                      />
                    </div>
                  ) : stage === 'email' ? (
                    <>
                      <div className="text-center w-full">
                        <h2 className="text-2xl font-bold">AI Biorhythm Analysis</h2>
                        <p className="mt-2 text-muted-foreground">
                          {recommendedDestination?.shortAnalysis || "The AI's biorhythm interpretation will be displayed here."}
                        </p>
                      </div>
                      <div className="w-full mt-4 rounded-lg shadow-lg flex justify-center items-center">
                        {(() => {
                          const imageUrl = adminImageUrl || recommendedDestination?.imageUrl;
                          const imageAlt = adminTitle || recommendedDestination?.destinationName || '';
                          if (!imageUrl) {
                            return null;
                          }
                          return (
                            <>
                              {!imgLoaded && (
                               // <div className="absolute inset-0 flex items-center justify-center bg-background/100 z-10">
                                  <LoadingSpinner title="" description="" />
                              //  </div>
                              )}
                              <Image
                                key={imageUrl}
                                src={imageUrl}
                                alt={imageAlt}
                                width={450}
                                height={imgNaturalHeight || 300}
                                style={{
                                  objectFit: 'cover',
                                  opacity: imgLoaded ? 1 : 0,
                                  transition: 'opacity 0.7s',
                                  width: 450,
                                  height: 'auto',
                                  borderRadius: 16,
                                  display: 'block',
                                }}
                                data-ai-hint="travel destination"
                                onLoad={handleImageLoad}
                                priority
                              />
                            </>
                          );
                        })()}
                      </div>
                      {adminTitle && (
                        <h3 className="mt-4 text-sm font-normal text-muted-foreground text-center">{adminTitle}</h3>
                      )}
                      <h1 className="mt-10 text-2xl md:text-xl font-black font-headline text-center">
                        Almost there!
                      </h1>
                      <p className="mt-2 text-sm font-normal text-muted-foreground text-center">
                        Please enter your email address.
                      </p>
                      <div className="mt-6 flex flex-col items-center gap-4 w-full" style={{ position: 'relative' }}>
                        {stage === 'email' && isPending && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(255,255,255,0.7)',
                              zIndex: 10,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 12,
                            }}
                          >
                            <LoadingSpinner />
                          </div>
                        )}
                        <EmailInput
                          value={email}
                          onChange={setEmail}
                          privacyChecked={privacyChecked}
                          onPrivacyChange={setPrivacyChecked}
                          onNext={handleEmailSubmit}
                          isPending={isPending}
                        />
                      </div>
                    </>
                  ) : stage === 'loading_persona' ? (
                    <div>
                      <LoadingSpinner />
                    </div>
                  ) : stage === 'result' && recommendedDestination ? (
                    <div>
                      <div className="my-8">
                        <ResultCard
                          persona={{
                            personaName: recommendedDestination.personaTitle?.trim() ? recommendedDestination.personaTitle : 'No information',
                            description: recommendedDestination.analysis?.trim() ? recommendedDestination.analysis : 'No information',
                            destination: recommendedDestination.destinationName?.trim() ? recommendedDestination.destinationName : 'No information',
                            imageUrl: recommendedDestination.imageUrl || '',
                            recommendations: Array.isArray(recommendedDestination.recommendations) ? recommendedDestination.recommendations : [],
                            budget: recommendedDestination.budget || 'No information',
                            transport: recommendedDestination.transport || 'No information',
                            tip: recommendedDestination.tip || 'No information',
                            id: '',
                            email: '',
                            birth_date: '',
                          }}
                          onReset={handleReset}
                        />
                      </div>
                      <div className="mt-8">
                        <p className="text-center text-muted-foreground mb-4">Recommended keywords from other travelers</p>
                        <RecommendList
                          list={recommendList}
                          onSelect={id => {
                        
                            handleOtherCardClick(id);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    // Fallback
                    <div className="text-center py-20">
                      <p className="text-lg text-destructive">Invalid access. Please start over from the beginning.</p>
                      <Button className="mt-4" onClick={handleReset}>Go to Start</Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <footer className="w-full mx-auto text-center text-xs text-muted-foreground pt-8">
          <p><a href="#" className="hover:underline">Privacy Policy</a> © ATOCnC Corp.</p>
          <p>We create a space for your story.</p>
        </footer>
      </main>
    </div>
  );
}