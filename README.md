# GrooHome - 여행 추천 바이오리듬 앱

## 📋 프로젝트 개요

GrooHome은 사용자의 생년월일을 기반으로 바이오리듬을 분석하여 최적의 여행지를 추천해주는 Next.js 기반 웹 애플리케이션입니다.

## 🚀 주요 기능

### 1. 바이오리듬 분석
- **신체 리듬**: 체력과 활동성 분석
- **감성 리듬**: 감정 상태와 창의성 분석  
- **지성 리듬**: 학습능력과 사고력 분석
- **지각 리듬**: 직관과 예지력 분석

### 2. 퀴즈 기반 여행지 추천
- 사용자 선호도 퀴즈를 통한 맞춤형 추천
- AI 기반 여행지 분석 및 추천
- 실시간 결과 생성 및 저장

### 3. 결과 공유 및 관리
- 결과 이미지 생성 및 공유
- 좋아요 기능
- 세션별 결과 저장 및 조회

### 4. 관리자 기능
- AI 모델 설정 관리
- 사용자 데이터 모니터링
- 시스템 설정 관리

## 🛠 기술 스택

### Frontend
- **Next.js 15.3.3** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Framer Motion** - 애니메이션
- **Radix UI** - UI 컴포넌트
- **Recharts** - 차트 라이브러리

### Backend & Database
- **Supabase** - 데이터베이스 및 인증
- **Firebase** - 파일 스토리지
- **Google AI (Gemini)** - AI 모델

### AI & Development
- **Genkit** - AI 개발 프레임워크
- **Google APIs** - 외부 서비스 연동

## 📁 프로젝트 구조

```
groohome/
├── src/
│   ├── ai/                    # AI 관련 설정 및 플로우
│   ├── app/                   # Next.js App Router
│   │   ├── admin/            # 관리자 페이지
│   │   ├── api/              # API 라우트
│   │   └── result/           # 결과 페이지
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── ui/              # 기본 UI 컴포넌트
│   │   └── result/          # 결과 관련 컴포넌트
│   ├── hooks/               # 커스텀 훅
│   └── lib/                 # 유틸리티 및 설정
├── docs/                    # 문서
└── public/                  # 정적 파일
```

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI 이미지 생성 (선택사항)
# 프로젝트에서 AI 이미지 생성 기능을 사용하지 않는 경우 생략 가능

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### 3. 개발 서버 실행
```bash
# 일반 개발 서버
npm run dev

# AI 개발 서버 (Genkit)
npm run genkit:dev
```

### 4. 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 🔧 주요 스크립트

- `npm run dev` - 개발 서버 실행 (포트 3000)
- `npm run genkit:dev` - Genkit AI 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 검사
- `npm run typecheck` - TypeScript 타입 검사

## 🔧 코드 품질 관리

### 린터 설정
- **ESLint**: TypeScript 코드 품질 검사
- **TypeScript**: 타입 안전성 보장
- **Prettier**: 코드 포맷팅

### 최근 개선 사항 (2024년 12월)
- ✅ TypeScript `any` 타입 사용 제거
- ✅ 사용하지 않는 변수 정리
- ✅ 타입 안전성 개선
- ✅ 에러 처리 강화
- ✅ ESLint v9 설정 업데이트

### 코드 검사 명령어
```bash
# TypeScript 타입 검사
npx tsc --noEmit

# ESLint 검사
npx eslint src/ --ext .ts,.tsx

# 전체 코드 품질 검사
npm run lint
```

## 📊 데이터베이스 스키마

### result_sessions 테이블
- `id`: 세션 고유 ID
- `email`: 사용자 이메일
- `birth_date`: 생년월일
- `quiz_answers`: 퀴즈 답변
- `ai_result`: AI 분석 결과
- `recommended_destination`: 추천 여행지
- `image_url`: 결과 이미지 URL
- `likes`: 좋아요 수
- `created_at`: 생성 시간

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일과 데스크톱 최적화
- **다크/라이트 모드**: 사용자 선호도에 따른 테마
- **애니메이션**: Framer Motion을 활용한 부드러운 전환
- **접근성**: Radix UI 컴포넌트로 접근성 보장

## 🔒 보안

- **환경 변수**: 민감한 정보는 환경 변수로 관리
- **API 키 보호**: 서버 사이드에서만 API 키 사용
- **입력 검증**: Zod를 통한 데이터 검증
- **CORS 설정**: 적절한 CORS 정책 적용

## 📈 성능 최적화

- **Next.js 15**: 최신 Next.js 기능 활용
- **Turbopack**: 빠른 개발 빌드
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: 자동 코드 분할 및 지연 로딩

## 🤝 기여하기

1. 프로젝트를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**개발자**: Groo  
**버전**: 0.1.0  
**최종 업데이트**: 2024년 12월 