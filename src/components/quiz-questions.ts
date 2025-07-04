export type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  height: string;
};

// AI 개인성향 분석 및 현실적 여행지 추천을 위한 50개 질문
export const allQuizQuestions: Question[] = [
  // === 여행 철학 및 동기 (1-8번) ===
  {
    id: 1,
    text: "여행에서 가장 중요하게 생각하는 가치는?",
    options: [
      { id: 'A', text: '완전한 휴식과 스트레스 해소' },
      { id: 'B', text: '새로운 문화와 사람들과의 교류' },
      { id: 'C', text: '자신의 한계를 시험하는 모험' },
      { id: 'D', text: '럭셔리하고 독특한 경험' },
    ],
    height: "26rem",
  },
  {
    id: 2,
    text: "이상적인 여행 기간은?",
    options: [
      { id: 'A', text: '2-3일의 짧은 여행' },
      { id: 'B', text: '일주일 정도의 여유로운 일정' },
      { id: 'C', text: '2-3주의 깊이 있는 탐험' },
      { id: 'D', text: '한 달 이상의 장기 체류' },
    ],
    height: "26rem",
  },
  {
    id: 3,
    text: "여행지 선택 시 가장 중요한 기준은?",
    options: [
      { id: 'A', text: '편리한 교통과 접근성' },
      { id: 'B', text: '독특한 자연 경관' },
      { id: 'C', text: '풍부한 역사와 문화' },
      { id: 'D', text: '현지 고유의 체험 활동' },
    ],
    height: "26rem",
  },
  {
    id: 4,
    text: "함께 여행하고 싶은 동반자는?",
    options: [
      { id: 'A', text: '혼자만의 자유로운 여행' },
      { id: 'B', text: '가족과 함께하는 따뜻한 시간' },
      { id: 'C', text: '연인과의 낭만적인 순간' },
      { id: 'D', text: '친구들과의 활기찬 모험' },
    ],
    height: "26rem",
  },
  {
    id: 5,
    text: "여행 계획을 세우는 스타일은?",
    options: [
      { id: 'A', text: '세부 일정까지 철저히 계획' },
      { id: 'B', text: '큰 틀만 정하고 현지에서 유연하게' },
      { id: 'C', text: '즉흥적으로 자유롭게' },
      { id: 'D', text: '전문 가이드나 현지인에게 맡김' },
    ],
    height: "26rem",
  },
  {
    id: 6,
    text: "여행에서 가장 기억에 남는 순간은?",
    options: [
      { id: 'A', text: '조용한 휴식과 여유' },
      { id: 'B', text: '현지인과의 진솔한 교류' },
      { id: 'C', text: '예기치 않은 놀라운 발견' },
      { id: 'D', text: '독특하고 특별한 경험' },
   ],
    height: "26rem",
  },
  {
    id: 7,
    text: "여행지에서 하루를 보내는 방식은?",
    options: [
      { id: 'A', text: '늦게 일어나 여유롭게 시작' },
      { id: 'B', text: '아침부터 활동적으로 탐험' },
      { id: 'C', text: '오전에 활동, 오후에 휴식' },
      { id: 'D', text: '밤늦게까지 활기찬 활동' },
    ],
    height: "26rem",
  },
  {
    id: 8,
    text: "여행의 성공을 판단하는 기준은?",
    options: [
      { id: 'A', text: '몸과 마음의 완전한 재충전' },
      { id: 'B', text: '새로운 배움과 경험의 풍부함' },
      { id: 'C', text: '계획한 일정의 완벽한 실행' },
      { id: 'D', text: '기대 이상의 특별한 만족감' },
    ],
    height: "26rem",
  },

  // === 환경 및 자연 선호도 (9-20번) ===
  {
    id: 9,
    text: "가장 마음이 편안해지는 자연 환경은?",
    options: [
      { id: 'A', text: '파도 소리가 들리는 해변' },
      { id: 'B', text: '새소리가 울리는 숲속' },
      { id: 'C', text: '드넓은 초원과 평야' },
      { id: 'D', text: '고요한 호수나 강변' },
    ],
    height: "26rem",
  },
  {
    id: 10,
    text: "선호하는 기후는 어떤 스타일인가요?",
    options: [
      { id: 'A', text: '따뜻하고 햇살 가득한 열대 기후' },
      { id: 'B', text: '시원하고 맑은 온대 기후' },
      { id: 'C', text: '건조하고 뜨거운 사막 기후' },
      { id: 'D', text: '서늘하고 청량한 고산 기후' },
    ],
    height: "26rem",
  },
  {
    id: 11,
    text: "물과 관련된 활동 중 가장 끌리는 것은?",
    options: [
      { id: 'A', text: '바다에서 스노클링이나 다이빙' },
      { id: 'B', text: '강에서 래프팅이나 서핑' },
      { id: 'C', text: '호수에서 카약이나 패들보드' },
      { id: 'D', text: '온천에서 편안한 휴식' },
    ],
    height: "26rem",
  },
  {
    id: 12,
    text: "산에서의 활동으로 가장 매력적인 것은?",
    options: [
      { id: 'A', text: '정상까지 도전하는 하이킹' },
      { id: 'B', text: '케이블카로 즐기는 산 정상 뷰' },
      { id: 'C', text: '산속 마을에서의 현지 체험' },
      { id: 'D', text: '산에서 캠핑과 별 관측' },
    ],
    height: "26rem",
  },
  {
    id: 13,
    text: "탐험해보고 싶은 독특한 지형은?",
    options: [
      { id: 'A', text: '광활한 사막과 모래 언덕' },
      { id: 'B', text: '신비로운 동굴과 지하 세계' },
      { id: 'C', text: '울창한 열대 우림' },
      { id: 'D', text: '눈 덮인 빙하와 극지방' },
    ],
    height: "26rem",
  },
  {
    id: 14,
    text: "섬 여행에서 가장 중요한 요소는?",
    options: [
      { id: 'A', text: '맑고 투명한 바다' },
      { id: 'B', text: '조용하고 한적한 분위기' },
      { id: 'C', text: '다양한 해양 스포츠' },
      { id: 'D', text: '섬 고유의 문화와 요리' },
    ],
    height: "26rem",
  },
  {
    id: 15,
    text: "야생동물과의 만남에서 기대하는 것은?",
    options: [
      { id: 'A', text: '안전하게 관찰하며 사진 촬영' },
      { id: 'B', text: '동물의 생태와 자연 학습' },
      { id: 'C', text: '직접 교감하며 만지는 체험' },
      { id: 'D', text: '희귀 동물을 발견하는 스릴' },
    ],
    height: "26rem",
  },
  {
    id: 16,
    text: "극한 환경에 대한 당신의 태도는?",
    options: [
      { id: 'A', text: '도전해보고 싶은 흥미로운 경험' },
      { id: 'B', text: '안전이 보장된다면 시도 가능' },
      { id: 'C', text: '다큐멘터리로 보는 것만으로 충분' },
      { id: 'D', text: '위험한 환경은 피하고 싶음' },
    ],
    height: "26rem",
  },
  {
    id: 17,
    text: "일출이나 일몰을 감상할 때 선호하는 장소는?",
    options: [
      { id: 'A', text: '바다 위 수평선에서의 일출/일몰' },
      { id: 'B', text: '산 정상에서의 장엄한 풍경' },
      { id: 'C', text: '사막에서의 붉은 노을' },
      { id: 'D', text: '도시 스카이라인과 어우러진 석양' },
    ],
    height: "26rem",
  },
  {
    id: 18,
    text: "자연재해나 위험에 대한 태도는?",
    options: [
      { id: 'A', text: '철저한 안전 장치가 필요' },
      { id: 'B', text: '기본적인 준비로 충분' },
      { id: 'C', text: '모험의 일부로 받아들임' },
      { id: 'D', text: '위험 지역은 여행에서 제외' },
    ],
    height: "26rem",
  },
  {
    id: 19,
    text: "계절감을 느끼는 여행의 선호도는?",
    options: [
      { id: 'A', text: '따뜻한 여름 기후' },
      { id: 'B', text: '사계절이 뚜렷한 지역' },
      { id: 'C', text: '눈 덮인 겨울 풍경' },
      { id: 'D', text: '봄꽃이나 가을 단풍' },
    ],
    height: "26rem",
  },
  {
    id: 20,
    text: "자연 속 숙박 스타일은?",
    options: [
      { id: 'A', text: '텐트로 즐기는 야생 캠핑' },
      { id: 'B', text: '글램핑으로 자연과 편안함 모두' },
      { id: 'C', text: '에코 리조트에서 친환경 휴식' },
      { id: 'D', text: '자연은 즐기되 숙소는 호텔' },
    ],
    height: "26rem",
  },

  // === 문화 및 인문학적 관심사 (21-30번) ===
  {
    id: 21,
    text: "역사적 장소 방문 시 가장 관심 있는 부분은?",
    options: [
      { id: 'A', text: '고대 건축의 웅장함과 기술' },
      { id: 'B', text: '과거 사람들의 생활과 이야기' },
      { id: 'C', text: '중요 역사적 사건의 현장' },
      { id: 'D', text: '유물과 유적의 신비로운 분위기' },
    ],
    height: "26rem",
  },
  {
    id: 22,
    text: "현지 문화 체험에서 가장 기대하는 것은?",
    options: [
      { id: 'A', text: '전통 공예나 의상 체험' },
      { id: 'B', text: '현지 가정에서의 식사' },
      { id: 'C', text: '전통 춤이나 음악 배우기' },
      { id: 'D', text: '현지 축제나 의식 참여' },
    ],
    height: "26rem",
  },
  {
    id: 23,
    text: "박물관이나 미술관에서의 관람 스타일은?",
    options: [
      { id: 'A', text: '가이드 투어로 상세히 탐구' },
      { id: 'B', text: '흥미로운 전시만 선택적으로' },
      { id: 'C', text: '전체를 훑으며 분위기 즐기기' },
      { id: 'D', text: '체험 프로그램이나 특별전 위주' },
    ],
    height: "26rem",
  },
  {
    id: 24,
    text: "현지 언어 소통에 대한 접근 방식은?",
    options: [
      { id: 'A', text: '여행 전 기본 회화 학습' },
      { id: 'B', text: '현지에서 간단히 배우기' },
      { id: 'C', text: '앱이나 몸짓으로 소통' },
      { id: 'D', text: '영어나 한국어로 가능한 곳만' },
    ],
    height: "26rem",
  },
  {
    id: 25,
    text: "종교적 장소 방문 시 태도는?",
    options: [
      { id: 'A', text: '예의를 갖추며 경건히 관람' },
      { id: 'B', text: '건축과 예술적 가치에 집중' },
      { id: 'C', text: '현지인의 신앙을 관찰' },
      { id: 'D', text: '관광지로만 인식' },
    ],
    height: "26rem",
  },
  {
    id: 26,
    text: "현지인과의 교류에서 원하는 것은?",
    options: [
      { id: 'A', text: '문화에 대한 깊이 있는 대화' },
      { id: 'B', text: '일상적인 가벼운 만남' },
      { id: 'C', text: '현지 정보와 추천 장소' },
      { id: 'D', text: '간단한 인사나 사진 촬영' },
    ],
    height: "26rem",
  },
  {
    id: 27,
    text: "전통 시장 방문의 주요 목적은?",
    options: [
      { id: 'A', text: '현지인의 생활 모습 관찰' },
      { id: 'B', text: '특산품과 음식 맛보기' },
      { id: 'C', text: '기념품 구매' },
      { id: 'D', text: '활기찬 시장 분위기 즐기기' },
    ],
    height: "26rem",
  },
  {
    id: 28,
    text: "축제 참여 방식은?",
    options: [
      { id: 'A', text: '직접 참여하며 즐기기' },
      { id: 'B', text: '관람하며 분위기 느끼기' },
      { id: 'C', text: '사진과 영상으로 기록' },
      { id: 'D', text: '축제의 역사와 의미 탐구' },
    ],
    height: "26rem",
  },
  {
    id: 29,
    text: "예술 공연 감상 시 선호하는 스타일은?",
    options: [
      { id: 'A', text: '전통 예술과 민속 공연' },
      { id: 'B', text: '현대적이고 실험적인 예술' },
      { id: 'C', text: '클래식 음악이나 오페라' },
      { id: 'D', text: '대중적이고 접근성 높은 공연' },
    ],
    height: "26rem",
  },
  {
    id: 30,
    text: "문화적 차이에 대한 반응은?",
    options: [
      { id: 'A', text: '배울 점이 많다고 느낌' },
      { id: 'B', text: '당황하지만 점차 적응' },
      { id: 'C', text: '차이를 인정하며 거리 유지' },
      { id: 'D', text: '불편함을 느끼고 피하고 싶음' },
    ],
    height: "26rem",
  },

  // === 활동 및 체험 선호도 (31-42번) ===
  {
    id: 31,
    text: "선호하는 신체 활동 강도는?",
    options: [
      { id: 'A', text: '격렬한 스포츠와 모험' },
      { id: 'B', text: '적당한 운동량의 활동' },
      { id: 'C', text: '산책이나 가벼운 걷기' },
      { id: 'D', text: '최소한의 움직임과 휴식' },
    ],
    height: "26rem",
  },
  {
    id: 32,
    text: "음식 체험에서 가장 중요하게 생각하는 것은?",
    options: [
      { id: 'A', text: '현지 고유의 독특한 맛' },
      { id: 'B', text: '신선하고 건강한 재료' },
      { id: 'C', text: '익숙하고 입맛에 맞는 음식' },
      { id: 'D', text: '시각적으로 아름다운 음식' },
    ],
    height: "26rem",
  },
  {
    id: 33,
    text: "새로운 음식에 대한 도전 의지는?",
    options: [
      { id: 'A', text: '모든 음식을 시도해보고 싶음' },
      { id: 'B', text: '추천받은 음식만 도전' },
      { id: 'C', text: '익숙해 보이는 음식만' },
      { id: 'D', text: '친숙한 음식 위주로' },
    ],
    height: "26rem",
  },
  {
    id: 34,
    text: "기념품 구매 시 선호는?",
    options: [
      { id: 'A', text: '현지 특산품' },
      { id: 'B', text: '실용적인 아이템' },
      { id: 'C', text: '추억을 떠올리는 장식품' },
      { id: 'D', text: '구매보다 경험 우선' },
    ],
    height: "26rem",
  },
  {
    id: 35,
    text: "여행 중 사진 촬영 스타일은?",
    options: [
      { id: 'A', text: '모든 순간을 꼼꼼히 기록' },
      { id: 'B', text: '특별한 순간만 촬영' },
      { id: 'C', text: '예술적인 풍경 사진 위주' },
      { id: 'D', text: '사진보다 직접 느끼는 것 우선' },
    ],
    height: "26rem",
  },
  {
    id: 36,
    text: "교통수단 선택 시 우선순위는?",
    options: [
      { id: 'A', text: '빠르고 편리한 이동' },
      { id: 'B', text: '경치를 즐기는 여유로운 이동' },
      { id: 'C', text: '현지 문화를 느낄 수 있는 수단' },
      { id: 'D', text: '독특하고 기억에 남는 이동' },
    ],
    height: "26rem",
  },
  {
    id: 37,
    text: "숙소 선택 시 가장 중요한 요소는?",
    options: [
      { id: 'A', text: '깨끗하고 편안한 환경' },
      { id: 'B', text: '현지 문화를 반영한 분위기' },
      { id: 'C', text: '아름다운 풍경과 위치' },
      { id: 'D', text: '독특한 컨셉의 숙소' },
    ],
    height: "26rem",
  },
  {
    id: 38,
    text: "여행 중 휴식 시간을 보내는 방식은?",
    options: [
      { id: 'A', text: '숙소에서 완전히 휴식' },
      { id: 'B', text: '카페에서 여유롭게 시간 보내기' },
      { id: 'C', text: '주변을 산책하며 탐방' },
      { id: 'D', text: '다음 일정 계획하며 준비' },
    ],
    height: "26rem",
  },
  {
    id: 39,
    text: "날씨가 좋지 않을 때의 대안 활동은?",
    options: [
      { id: 'A', text: '박물관이나 실내 관광지 방문' },
      { id: 'B', text: '카페나 레스토랑에서 여유' },
      { id: 'C', text: '쇼핑몰이나 시장 탐방' },
      { id: 'D', text: '숙소에서 휴식하며 대기' },
    ],
    height: "26rem",
  },
  {
    id: 40,
    text: "여행 중 건강 관리에 대한 태도는?",
    options: [
      { id: 'A', text: '건강한 식단과 운동 유지' },
      { id: 'B', text: '적당한 활동으로 컨디션 유지' },
      { id: 'C', text: '여행 중엔 자유롭게 즐김' },
      { id: 'D', text: '즐거움과 경험이 건강보다 우선' },
    ],
    height: "26rem",
  },
  {
    id: 41,
    text: "예상치 못한 상황에서의 대처 방식은?",
    options: [
      { id: 'A', text: '침착하게 해결책 찾기' },
      { id: 'B', text: '재미있는 에피소드로 받아들임' },
      { id: 'C', text: '대안 계획 실행' },
      { id: 'D', text: '현지인이나 전문가에게 도움 요청' },
    ],
    height: "26rem",
  },
  {
    id: 42,
    text: "여행에서 학습과 성장에 대한 기대는?",
    options: [
      { id: 'A', text: '새로운 지식과 경험으로 성장' },
      { id: 'B', text: '자연스럽게 배우면 좋지만 강요 NO' },
      { id: 'C', text: '휴식이 우선, 학습은 부담' },
      { id: 'D', text: '흥미로운 것만 선택적으로 학습' },
    ],
    height: "26rem",
  },

  // === 라이프스타일 및 개인 성향 (43-50번) ===
  {
    id: 43,
    text: "평소 휴일을 보내는 방식은?",
    options: [
      { id: 'A', text: '집에서 휴식하며 재충전' },
      { id: 'B', text: '가까운 곳으로 나들이' },
      { id: 'C', text: '친구들과 활동적으로' },
      { id: 'D', text: '새로운 장소 탐험' },
    ],
    height: "26rem",
  },
  {
    id: 44,
    text: "스트레스 해소에 가장 효과적인 방법은?",
    options: [
      { id: 'A', text: '충분한 휴식과 수면' },
      { id: 'B', text: '운동이나 신체 활동' },
      { id: 'C', text: '친구와의 대화와 만남' },
      { id: 'D', text: '취미나 새로운 도전' },
    ],
    height: "26rem",
  },
  {
    id: 45,
    text: "낯선 사람들과의 만남에 대한 태도는?",
    options: [
      { id: 'A', text: '적극적으로 친해지기' },
      { id: 'B', text: '상대가 먼저 다가오면 자연스럽게' },
      { id: 'C', text: '필요 시 최소한의 대화' },
      { id: 'D', text: '혼자 있는 시간 선호' },
    ],
    height: "26rem",
  },
  {
    id: 46,
    text: "새로운 환경에 대한 적응력은?",
    options: [
      { id: 'A', text: '변화를 즐기며 빠르게 적응' },
      { id: 'B', text: '조금 어색하지만 점차 적응' },
      { id: 'C', text: '적응에 시간이 필요' },
      { id: 'D', text: '익숙한 환경을 선호' },
    ],
    height: "26rem",
  },
  {
    id: 47,
    text: "위험하거나 모험적인 활동에 대한 태도는?",
    options: [
      { id: 'A', text: '스릴을 즐기는 모험가' },
      { id: 'B', text: '안전이 보장되면 도전' },
      { id: 'C', text: '검증된 활동만 시도' },
      { id: 'D', text: '안전한 활동만 선호' },
    ],
    height: "26rem",
  },
  {
    id: 48,
    text: "시간 관리와 계획에 대한 성향은?",
    options: [
      { id: 'A', text: '철저한 계획과 준비' },
      { id: 'B', text: '큰 틀만 계획, 세부는 유연히' },
      { id: 'C', text: '최소한의 준비로 즉흥적' },
      { id: 'D', text: '계획 자체를 싫어함' },
    ],
    height: "26rem",
  },
  {
    id: 49,
    text: "경험과 물질적 소유 중 어느 것을 더 중시하나요?",
    options: [
      { id: 'A', text: '경험이 가장 소중한 자산' },
      { id: 'B', text: '좋은 경험을 위해 투자 가능' },
      { id: 'C', text: '경험과 실용성을 모두 고려' },
      { id: 'D', text: '실질적 가치를 더 중시' },
    ],
    height: "26rem",
  },
  {
    id: 50,
    text: "여행을 통해 궁극적으로 얻고 싶은 것은?",
    options: [
      { id: 'A', text: '스트레스 해소와 완전한 휴식' },
      { id: 'B', text: '새로운 깨달음과 영감' },
      { id: 'C', text: '평생 기억될 독특한 경험' },
      { id: 'D', text: '소중한 사람들과의 추억' },
    ],
    height: "26rem",
  },
];

// 카테고리별 2개씩(총 10개) 랜덤 추출, 5개 항목이 항상 포함되도록 반환
export function getShuffledQuestions(): Question[] {
  // 카테고리별 인덱스 범위 및 의미
  const CATEGORY_RANGES = [
    { start: 1, end: 8 },      // 여행 철학 (기본 동기와 가치관)
    { start: 9, end: 20 },     // 환경 선호 (자연환경과 지형 취향)
    { start: 21, end: 30 },    // 문화 관심 (역사, 예술, 현지 교류)
    { start: 31, end: 42 },    // 활동 성향 (신체활동, 음식, 체험)
    { start: 43, end: 50 },    // 개인 특성 (성격, 적응력, 위험감수)
  ];

  // Fisher-Yates shuffle
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    let currentIndex = arr.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  // 카테고리별로 2개씩 랜덤 추출
  let selected: Question[] = [];
  CATEGORY_RANGES.forEach(range => {
    const slice = allQuizQuestions.filter(q => q.id >= range.start && q.id <= range.end);
    const picked = shuffleArray(slice).slice(0, 3);
    selected = selected.concat(picked);
  });

  // 전체 섞기
  const shuffled = shuffleArray(selected);
  // 각 질문의 options도 셔플
  return shuffled.map(q => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

