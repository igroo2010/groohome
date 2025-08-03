# WanderPersona - 여행 페르소나 생성 앱

## 📋 프로젝트 개요

WanderPersona는 사용자의 생년월일과 퀴즈 답변을 기반으로 개인화된 여행 페르소나를 생성하는 Next.js 기반 웹 애플리케이션입니다. AI를 활용하여 사용자에게 맞춤형 여행지 추천과 페르소나를 제공합니다.

## ✨ 주요 기능

### 🎯 핵심 기능
- **생체리듬 분석**: 사용자의 생년월일을 기반으로 생체리듬 차트 제공
- **인터랙티브 퀴즈**: 단계별 퀴즈를 통한 개인 성향 분석
- **AI 페르소나 생성**: LLM을 활용한 개인화된 여행 페르소나 생성
- **맞춤형 여행지 추천**: 퀴즈 결과를 바탕으로 한 여행지 및 예산 추천
- **결과 공유**: 소셜 미디어 공유 가능한 결과 카드 생성
- **관리자 대시보드**: 세션 관리 및 통계 확인

### 🎨 디자인 특징
- **컬러 팔레트**: 
  - 주 컬러: Dusty rose (#C4A4A4)
  - 배경: Off-white (#F5F5F5)
  - 액센트: Muted mauve (#B784A7)
- **타이포그래피**: 
  - 헤드라인: Playfair (세리프)
  - 본문: PT Sans (산세리프)
- **반응형 디자인**: 모바일 및 데스크톱 최적화

## 🏗️ 프로젝트 구조

```
groohome/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 관리자 페이지
│   │   ├── api/               # API 라우트
│   │   ├── result/            # 결과 페이지
│   │   └── actions.ts         # 서버 액션
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── result/           # 결과 관련 컴포넌트
│   │   └── wander-persona-app.tsx  # 메인 앱 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 유틸리티 및 설정
│   └── ai/                   # AI 관련 설정
├── docs/                     # 문서
└── public/                   # 정적 파일
```

## 🚀 기술 스택

### Frontend
- **Next.js 15.3.3** - React 프레임워크
- **React 18.3.1** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Framer Motion** - 애니메이션
- **Radix UI** - 접근성 컴포넌트

### Backend & Database
- **Supabase** - 데이터베이스 및 인증
- **Firebase** - 파일 저장소
- **Next.js API Routes** - 서버 API

### AI & External Services
- **Genkit** - AI 워크플로우
- **Google AI** - LLM 서비스
- **Recharts** - 차트 라이브러리

## 🔧 최근 디버깅 및 수정사항

### ✅ 해결된 문제들
1. **Next.js 15 타입 호환성 문제**
   - 동적 라우트의 `params`가 Promise로 변경됨
   - `src/app/api/get-session-detail/[sessionId]/route.ts` 수정
   - `src/app/result/[sessionId]/page.tsx` 수정
   - 타입 정의를 `Promise<{ sessionId: string }>`로 업데이트

2. **TypeScript 컴파일 오류 해결**
   - 모든 타입 체크 통과
   - 빌드 성공적으로 완료

3. **개발 환경 안정성**
   - 개발 서버 정상 실행
   - 모든 API 라우트 정상 작동

### ⚠️ 알려진 경고사항
- Genkit AI 라이브러리 관련 경고 (기능에 영향 없음)
- OpenTelemetry 관련 의존성 경고 (정상 동작)

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Google AI 설정
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### 3. 개발 서버 실행
```bash
# 개발 서버
npm run dev

# AI 개발 서버 (별도 터미널)
npm run genkit:dev
```

### 4. 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🔧 주요 스크립트

```json
{
  "dev": "next dev --turbopack -p 3000",           # 개발 서버
  "genkit:dev": "genkit start -- tsx src/ai/dev.ts", # AI 개발 서버
  "build": "next build",                            # 프로덕션 빌드
  "start": "next start",                            # 프로덕션 서버
  "lint": "next lint",                              # 코드 린팅
  "typecheck": "tsc --noEmit"                      # 타입 체크
}
```

## 📱 주요 페이지

### 사용자 페이지
- **메인 페이지** (`/`): 퀴즈 시작 및 페르소나 생성
- **결과 페이지** (`/result/[sessionId]`): 생성된 페르소나 결과 표시

### 관리자 페이지
- **관리자 대시보드** (`/admin`): 세션 관리 및 통계
- **관리자 설정** (`/admin/dashboard`): 앱 설정 관리

## 🔄 워크플로우

1. **시작**: 사용자가 메인 페이지에서 퀴즈 시작
2. **생체리듬**: 생년월일 입력 후 생체리듬 분석
3. **퀴즈**: 개인 성향을 파악하는 인터랙티브 퀴즈
4. **이메일**: 개인정보 수집 동의 및 이메일 입력
5. **AI 처리**: Genkit을 통한 페르소나 및 여행지 생성
6. **결과 표시**: 생성된 결과를 카드 형태로 표시
7. **공유**: 소셜 미디어 공유 기능

## 🛠️ 개발 가이드

### 컴포넌트 구조
- **모듈화**: 각 기능별로 독립적인 컴포넌트 구성
- **타입 안전성**: TypeScript를 활용한 타입 정의
- **에러 처리**: 예외 상황에 대한 적절한 에러 핸들링

### 코드 스타일
- **한글 주석**: 코드 설명을 한글로 작성
- **명확한 변수명**: 누가 봐도 이해할 수 있는 변수명 사용
- **함수 분리**: 긴 코드는 작은 함수로 분리

## 📊 데이터베이스 스키마

### 주요 테이블
- **sessions**: 사용자 세션 정보
- **quiz_results**: 퀴즈 결과 데이터
- **admin_settings**: 관리자 설정

## 🔐 보안

- **환경 변수**: 민감한 정보는 환경 변수로 관리
- **API 키 보호**: 서버 사이드에서만 API 키 사용
- **데이터 검증**: Zod를 통한 입력 데이터 검증

## 🤝 기여하기

1. 프로젝트를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**WanderPersona** - 당신만의 특별한 여행 페르소나를 발견하세요! ✈️ 