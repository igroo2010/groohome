# WanderPersona

## 개요
WanderPersona는 사용자의 바이오리듬과 성향 퀴즈를 기반으로 AI가 맞춤형 국내 여행 페르소나와 여행지를 추천해주는 서비스입니다. 결과는 AI 이미지와 함께 제공되며, 공유 기능도 지원합니다.

## 주요 기능
- 생년월일 기반 바이오리듬 분석 및 시각화
- 50문항 성향 퀴즈 진행 및 답변 저장
- AI 기반 여행 페르소나, 여행지, 상세 설명, 추천 장소(숙소/맛집/명소) 자동 생성
- AI 이미지 생성(여행지 대표 이미지)
- 결과 화면에서 추천 여행지, 상세 분석, 예산, 교통, 팁 등 제공
- 추천 결과 공유(카카오톡 등)
- 추천 리스트, 좋아요 기능, 세션별 결과 조회
- 관리자 설정 캐싱 및 관리

## 폴더 구조
- `src/app/` : Next.js 라우트, API 엔드포인트, 메인 페이지, 관리자/결과/동적 라우트 포함
- `src/components/` : 주요 UI 컴포넌트, 퀴즈, 결과 카드, 바이오리듬, 공유 등
- `src/components/ui/` : Radix 기반 공통 UI 컴포넌트
- `src/components/result/` : 결과 상세, 추천 리스트 컴포넌트
- `src/ai/` : AI 플로우, LLM 프롬프트, 여행지 추천 로직
- `src/ai/flows/` : 여행지 추천 플로우(LLM 프롬프트, 결과 생성)
- `src/hooks/` : 커스텀 훅
- `src/lib/` : 바이오리듬 계산, 관리자 설정, Supabase/Firebase 연동, 유틸리티
- `docs/blueprint.md` : 서비스 기획 및 스타일 가이드

## 설치 및 실행 방법
1. 의존성 설치
```
npm install
```
2. 개발 서버 실행
```
npm run dev
```
3. 빌드 및 프로덕션 실행
```
npm run build
npm start
```

## 도커 실행
1. 환경변수(.env) 파일 준비 (Supabase/Firebase 등)
2. 도커 빌드 및 실행
```
docker-compose up --build
```
- 기본 포트: 3000
- 현제 포트: 9002

## 기술 스택
- Next.js 15, React 18, TypeScript
- Tailwind CSS, Radix UI
- Genkit, GoogleAI, Supabase, Firebase
- Framer Motion, Recharts, date-fns 등

## 주요 환경변수
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_FIREBASE_API_KEY 등

## 기타 참고
- 스타일/테마: Tailwind, blueprint.md 참고
- 관리자 설정: .env 및 API, 캐시 활용
- 이미지/결과 저장: Supabase, Firebase 연동

---
문의: blueprint.md 및 소스 주석 참고 