# GrooHome 프로젝트 파일 구조

## 📁 전체 프로젝트 구조

```
groohome/
├── 📄 apphosting.yaml              # 앱 호스팅 설정
├── 📄 components.json              # 컴포넌트 설정
├── 📄 docker-compose.yml           # Docker Compose 설정
├── 📄 Dockerfile                   # Docker 이미지 설정
├── 📄 next.config.ts               # Next.js 설정
├── 📄 package.json                 # 프로젝트 의존성 및 스크립트
├── 📄 package-lock.json            # 의존성 잠금 파일
├── 📄 postcss.config.mjs           # PostCSS 설정
├── 📄 tailwind.config.ts           # Tailwind CSS 설정
├── 📄 tsconfig.json                # TypeScript 설정
├── 📄 eslint.config.js             # ESLint 설정 (v9)
├── 📄 .eslintrc.json               # ESLint 설정 (레거시)
├── 📄 README.md                    # 프로젝트 문서
├── 📄 File Tree.md                 # 파일 구조 문서 (현재 파일)
│
├── 📁 docs/                        # 문서 디렉토리
│   └── 📄 blueprint.md             # 프로젝트 블루프린트
│
└── 📁 src/                         # 소스 코드 디렉토리
    ├── 📁 ai/                      # AI 관련 설정 및 플로우
    │   ├── 📄 dev.ts               # AI 개발 설정
    │   ├── 📄 genkit.ts            # Genkit AI 설정
    │   └── 📁 flows/               # AI 플로우 디렉토리
    │       └── 📄 recommend-destination.ts  # 여행지 추천 플로우
    │
    ├── 📁 app/                     # Next.js App Router
    │   ├── 📄 actions.ts           # 서버 액션
    │   ├── 📄 favicon.ico          # 파비콘
    │   ├── 📄 globals.css          # 전역 스타일
    │   ├── 📄 layout.tsx           # 루트 레이아웃
    │   ├── 📄 page.tsx             # 홈페이지
    │   │
    │   ├── 📁 admin/               # 관리자 페이지
    │   │   ├── 📄 layout.tsx       # 관리자 레이아웃
    │   │   ├── 📄 page.tsx         # 관리자 메인 페이지
    │   │   └── 📁 dashboard/       # 대시보드
    │   │       └── 📄 page.tsx     # 대시보드 페이지
    │   │
    │   ├── 📁 api/                 # API 라우트
    │   │   ├── 📁 admin-settings/  # 관리자 설정 API
    │   │   │   └── 📄 route.ts     # 관리자 설정 라우트
    │   │   ├── 📁 biorhythm-interpret/  # 바이오리듬 해석 API
    │   │   │   └── 📄 route.ts     # 바이오리듬 해석 라우트
    │   │   ├── 📁 generate-quiz-questions/  # 퀴즈 생성 API
    │   │   │   └── 📄 route.ts     # 퀴즈 생성 라우트
    │   │   ├── 📁 get-recommend-list/  # 추천 목록 조회 API
    │   │   │   └── 📄 route.ts     # 추천 목록 라우트
    │   │   ├── 📁 get-session-detail/  # 세션 상세 조회 API
    │   │   │   └── 📁 [sessionId]/    # 동적 세션 ID
    │   │   │       └── 📄 route.ts     # 세션 상세 라우트
    │   │   ├── 📁 like-destination/    # 좋아요 API
    │   │   │   └── 📄 route.ts     # 좋아요 라우트
    │   │   ├── 📁 save-quiz-result-session/  # 퀴즈 결과 저장 API
    │   │   │   └── 📄 route.ts     # 퀴즈 결과 저장 라우트
    │   │   ├── 📁 upload-image/    # 이미지 업로드 API
    │   │   │   └── 📄 route.ts     # 이미지 업로드 라우트
    │   │   └── 📄 update-session-image.ts  # 세션 이미지 업데이트
    │   │
    │   └── 📁 result/              # 결과 페이지
    │       └── 📁 [sessionId]/     # 동적 세션 ID
    │           └── 📄 page.tsx      # 결과 페이지
    │
    ├── 📁 components/              # 재사용 가능한 컴포넌트
    │   ├── 📄 biorhythm-chart.tsx  # 바이오리듬 차트 컴포넌트
    │   ├── 📄 biorhythm-display.tsx  # 바이오리듬 표시 컴포넌트
    │   ├── 📄 ClientOnly.tsx       # 클라이언트 전용 컴포넌트
    │   ├── 📄 loading-spinner.tsx  # 로딩 스피너 컴포넌트
    │   ├── 📄 quiz-questions.ts    # 퀴즈 질문 데이터
    │   ├── 📄 quiz.tsx             # 퀴즈 컴포넌트
    │   ├── 📄 result-card.tsx      # 결과 카드 컴포넌트
    │   ├── 📄 share-card.tsx       # 공유 카드 컴포넌트
    │   ├── 📄 wander-persona-app.tsx  # 메인 앱 컴포넌트
    │   ├── 📄 wander-persona-app.tsx_backup  # 백업 파일
    │   │
    │   ├── 📁 result/              # 결과 관련 컴포넌트
    │   │   ├── 📄 RecommendList.tsx  # 추천 목록 컴포넌트
    │   │   └── 📄 ResultDetail.tsx   # 결과 상세 컴포넌트
    │   │
    │   └── 📁 ui/                  # 기본 UI 컴포넌트 (Radix UI 기반)
    │       ├── 📄 accordion.tsx     # 아코디언 컴포넌트
    │       ├── 📄 alert-dialog.tsx  # 알림 다이얼로그
    │       ├── 📄 alert.tsx         # 알림 컴포넌트
    │       ├── 📄 avatar.tsx        # 아바타 컴포넌트
    │       ├── 📄 badge.tsx         # 배지 컴포넌트
    │       ├── 📄 button.tsx        # 버튼 컴포넌트
    │       ├── 📄 calendar.tsx      # 캘린더 컴포넌트
    │       ├── 📄 card.tsx          # 카드 컴포넌트
    │       ├── 📄 chart.tsx         # 차트 컴포넌트
    │       ├── 📄 checkbox.tsx      # 체크박스 컴포넌트
    │       ├── 📄 dialog.tsx        # 다이얼로그 컴포넌트
    │       ├── 📄 dropdown-menu.tsx # 드롭다운 메뉴
    │       ├── 📄 form.tsx          # 폼 컴포넌트
    │       ├── 📄 input.tsx         # 입력 컴포넌트
    │       ├── 📄 label.tsx         # 라벨 컴포넌트
    │       ├── 📄 menubar.tsx       # 메뉴바 컴포넌트
    │       ├── 📄 popover.tsx       # 팝오버 컴포넌트
    │       ├── 📄 progress.tsx      # 진행률 컴포넌트
    │       ├── 📄 radio-group.tsx   # 라디오 그룹 컴포넌트
    │       ├── 📄 scroll-area.tsx   # 스크롤 영역 컴포넌트
    │       ├── 📄 select.tsx        # 선택 컴포넌트
    │       ├── 📄 separator.tsx     # 구분선 컴포넌트
    │       ├── 📄 sheet.tsx         # 시트 컴포넌트
    │       ├── 📄 sidebar.tsx       # 사이드바 컴포넌트
    │       ├── 📄 skeleton.tsx      # 스켈레톤 컴포넌트
    │       ├── 📄 slider.tsx        # 슬라이더 컴포넌트
    │       ├── 📄 switch.tsx        # 스위치 컴포넌트
    │       ├── 📄 table.tsx         # 테이블 컴포넌트
    │       ├── 📄 tabs.tsx          # 탭 컴포넌트
    │       ├── 📄 textarea.tsx      # 텍스트 영역 컴포넌트
    │       ├── 📄 toast.tsx         # 토스트 컴포넌트
    │       ├── 📄 toaster.tsx       # 토스터 컴포넌트
    │       └── 📄 tooltip.tsx       # 툴팁 컴포넌트
    │
    ├── 📁 hooks/                   # 커스텀 훅
    │   ├── 📄 use-mobile.tsx       # 모바일 감지 훅
    │   └── 📄 use-toast.ts         # 토스트 훅
    │
    └── 📁 lib/                     # 유틸리티 및 설정
        ├── 📄 adminSettingsCache.ts # 관리자 설정 캐시
        ├── 📄 biorhythm.ts          # 바이오리듬 계산 유틸리티
        ├── 📄 fetchAdminSettings.ts # 관리자 설정 조회
        ├── 📄 firebase.ts           # Firebase 설정
        ├── 📄 supabase.ts           # Supabase 설정
        └── 📄 utils.ts              # 공통 유틸리티
```

## 📋 주요 파일 설명

### 🔧 설정 파일
- **`tsconfig.json`**: TypeScript 컴파일러 설정
- **`tailwind.config.ts`**: Tailwind CSS 설정
- **`next.config.ts`**: Next.js 프레임워크 설정
- **`package.json`**: 프로젝트 의존성 및 스크립트 정의

### 🎨 UI 컴포넌트
- **`components/ui/`**: Radix UI 기반 재사용 가능한 UI 컴포넌트
- **`components/result/`**: 결과 페이지 전용 컴포넌트
- **`components/biorhythm-*.tsx`**: 바이오리듬 관련 컴포넌트

### 🔌 API 라우트
- **`app/api/`**: Next.js API 라우트 (서버리스 함수)
- 각 API는 특정 기능을 담당하는 RESTful 엔드포인트

### 🧠 AI 관련
- **`src/ai/`**: AI 모델 설정 및 플로우 정의
- **`src/ai/flows/`**: AI 워크플로우 정의

### 🛠 유틸리티
- **`src/lib/`**: 공통 유틸리티 함수 및 설정
- **`src/hooks/`**: 커스텀 React 훅

### 📱 페이지
- **`app/page.tsx`**: 메인 홈페이지
- **`app/admin/`**: 관리자 대시보드
- **`app/result/[sessionId]/`**: 동적 결과 페이지

## 🔄 파일 업데이트 규칙

1. **새 컴포넌트 추가 시**: `components/` 디렉토리에 적절한 위치에 배치
2. **새 API 추가 시**: `app/api/` 디렉토리에 기능별로 분류
3. **새 페이지 추가 시**: `app/` 디렉토리에 적절한 위치에 배치
4. **유틸리티 함수 추가 시**: `lib/` 디렉토리에 배치
5. **AI 관련 추가 시**: `ai/` 디렉토리에 배치

## 📝 파일 명명 규칙

- **컴포넌트**: PascalCase (예: `BiorhythmChart.tsx`)
- **훅**: camelCase + `use` 접두사 (예: `useMobile.tsx`)
- **유틸리티**: camelCase (예: `biorhythm.ts`)
- **API 라우트**: kebab-case (예: `biorhythm-interpret/`)
- **페이지**: kebab-case (예: `[sessionId]/`)

---

**마지막 업데이트**: 2024년 12월  
**문서 버전**: 1.0.0 