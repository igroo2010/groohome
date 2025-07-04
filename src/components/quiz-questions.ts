export type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  height: string;
};

export const allQuizQuestions: Question[] = [
  {
    id: 1,
    text: "당신이 꿈꾸는 이상적인 휴가는?",
    options: [
      { id: 'A', text: '조용한 해변에서 여유롭게 쉬기' },
      { id: 'B', text: '도시 거리 활기차게 걷기' },
      { id: 'C', text: '산길 따라 하이킹 즐기기' },
      { id: 'D', text: '고급 숙소와 멋진 식사' },
    ],
    height: "26rem",
  },
  {
    id: 2,
    text: '여행할 때 가장 기대되는 것은?',
    options: [
      { id: 'A', text: '역사와 문화 현장 탐방하기' },
      { id: 'B', text: '이국적인 음식 맛보기' },
      { id: 'C', text: '모험과 신체적 도전 즐기기' },
      { id: 'D', text: '쇼핑과 밤거리 구경하기' },
    ],
    height: "26rem",
  },
  {
    id: 3,
    text: '어떤 이동 수단을 선호하시나요?',
    options: [
      { id: 'A', text: '대중교통으로 현지 체험' },
      { id: 'B', text: '택시·차량공유로 편하게' },
      { id: 'C', text: '렌터카로 자유롭게 이동' },
      { id: 'D', text: '가이드 투어로 여행하기' },
    ],
    height: "26rem",
  },
  {
    id: 4,
    text: "당신의 여행 속도는 어떤가요?",
    options: [
      { id: 'A', text: '여유롭게 모든 것 음미' },
      { id: 'B', text: '빽빽한 일정, 많이 보기' },
      { id: 'C', text: '즉흥적으로 자유롭게 여행' },
      { id: 'D', text: '계획과 자유시간 균형잡기' },
    ],
    height: "26rem",
  },
  {
    id: 5,
    text: "함께 여행하고 싶은 동반자는?",
    options: [
      { id: 'A', text: '자아 발견을 위한 나 홀로 여행' },
      { id: 'B', text: '연인과의 낭만적인 여행' },
      { id: 'C', text: '친구들과의 즐거운 여행' },
      { id: 'D', text: '모든 연령대를 위한 가족 여행' },
    ],
    height: "26rem",
  },
  {
    id: 6,
    text: "어떤 풍경을 가장 선호하시나요?",
    options: [
      { id: 'A', text: '눈 덮인 산과 차가운 공기' },
      { id: 'B', text: '끝없이 펼쳐진 사막과 별이 쏟아지는 밤' },
      { id: 'C', text: '울창한 정글과 신비로운 동식물' },
      { id: 'D', text: '역사적인 건축물과 오래된 골목길' },
    ],
    height: "26rem",
  },
  {
    id: 7,
    text: "여행의 주된 목적은 무엇인가요?",
    options: [
      { id: 'A', text: '완벽한 휴식과 재충전' },
      { id: 'B', text: '새로운 경험과 자기 성장' },
      { id: 'C', text: '짜릿한 액티비티와 모험' },
      { id: 'D', text: '인스타그램에 올릴 멋진 사진 남기기' },
    ],
    height: "26rem",
  },
  {
    id: 8,
    text: "여행 계획 스타일은 어떤가요?",
    options: [
      { id: 'A', text: '꼼꼼하게 계획하고 예약 완료' },
      { id: 'B', text: '주요 동선만 정하고 나머지는 즉흥적으로' },
      { id: 'C', text: '아무 계획 없이 마음 가는 대로' },
      { id: 'D', text: '현지 전문가의 추천에 맡김' },
    ],
    height: "26rem",
  },
  {
    id: 9,
    text: "여행 예산은 얼마나 생각하시나요?",
    options: [
      { id: 'A', text: '가성비를 중시하며 알뜰하게 여행' },
      { id: 'B', text: '예산에 크게 구애받지 않고 원하는 것을 즐김' },
      { id: 'C', text: '숙소는 저렴하게, 먹는 것에는 투자' },
      { id: 'D', text: '특별한 경험을 위해서라면 큰 지출도 OK' },
    ],
    height: "26rem",
  },
  {
    id: 10,
    text: "주로 어떤 기념품을 구매하시나요?",
    options: [
      { id: 'A', text: '현지 장인이 만든 수공예품' },
      { id: 'B', text: '그 지역에서만 맛볼 수 있는 음식이나 술' },
      { id: 'C', text: '여행지의 풍경이 담긴 엽서나 마그넷' },
      { id: 'D', text: '기념품은 사지 않고, 추억만 간직' },
    ],
    height: "26rem",
  },
  {
    id: 11,
    text: "선호하는 숙소 스타일은?",
    options: [
      { id: 'A', text: '모든 것이 갖춰진 5성급 럭셔리 호텔' },
      { id: 'B', text: '현지 감성이 묻어나는 부티크 호텔이나 에어비앤비' },
      { id: 'C', text: '자연 속에 위치한 조용한 펜션이나 산장' },
      { id: 'D', text: '새로운 사람들을 만날 수 있는 활기찬 호스텔' },
    ],
    height: "26rem",
  },
  {
    id: 12,
    text: "여행지에서 어떤 활동을 즐기시나요?",
    options: [
      { id: 'A', text: '유명 박물관, 미술관, 역사 유적지 방문' },
      { id: 'B', text: '현지 쿠킹 클래스, 공예 체험 등 문화 체험' },
      { id: 'C', text: '아름다운 카페에 앉아 사람 구경하며 시간 보내기' },
      { id: 'D', text: '서핑, 스노클링 등 액티비티' },
    ],
    height: "26rem",
  },
  {
    id: 13,
    text: "여행지에서 선호하는 음식은?",
    options: [
      { id: 'A', text: '미슐랭 스타 레스토랑에서의 파인 다이닝' },
      { id: 'B', text: '현지인들이 추천하는 숨은 맛집 탐방' },
      { id: 'C', text: '활기 넘치는 야시장에서의 길거리 음식' },
      { id: 'D', text: '직접 요리할 수 있는 숙소에서 현지 식재료로 만들기' },
    ],
    height: "26rem",
  },
  {
    id: 14,
    text: "여행지에서의 저녁 어떻게 보내고 싶으신가요?",
    options: [
      { id: 'A', text: '화려한 야경을 감상할 수 있는 루프탑 바 방문' },
      { id: 'B', text: '숙소에서 편안하게 영화나 책과 함께 휴식' },
      { id: 'C', text: '현지 라이브 공연이나 연극 관람' },
      { id: 'D', text: '클럽이나 펍에서 현지 밤 문화 즐기기' },
    ],
    height: "26rem",
  },
  {
    id: 15,
    text: "여행 사진은 어떤 스타일로?",
    options: [
      { id: 'A', text: '아름다운 풍경 위주의 사진' },
      { id: 'B', text: '나의 모습이 중심이 되는 인물 사진' },
      { id: 'C', text: '맛있는 음식과 감성적인 소품 사진' },
      { id: 'D', text: '사진은 거의 찍지 않고 눈으로 담는 편' },
    ],
    height: "26rem",
  },
  {
    id: 16,
    text: "현지인과의 교류를 어떻게 생각하시나요?",
    options: [
      { id: 'A', text: '적극적으로 다가가 대화하고 친구가 되고 싶다' },
      { id: 'B', text: '필요할 때 도움을 구하는 정도면 충분하다' },
      { id: 'C', text: '가급적 마주치고 싶지 않다' },
      { id: 'D', text: '언어 장벽 때문에 망설여진다' },
    ],
    height: "26rem",
  },
  {
    id: 17,
    text: "여행을 통한 배움을 어떻게 생각 하세요?",
    options: [
      { id: 'A', text: '여행의 가장 중요한 부분이라고 생각한다' },
      { id: 'B', text: '기회가 되면 좋지만, 굳이 찾아다니진 않는다' },
      { id: 'C', text: '휴식이 목적이라, 배우는 것은 피하고 싶다' },
      { id: 'D', text: '새로운 언어나 기술을 배우는 것을 즐긴다' },
    ],
    height: "26rem",
  },
  {
    id: 18,
    text: "여행 중 예상치 못한 상황이 발생한다면?",
    options: [
      { id: 'A', text: '당황하지만 침착하게 해결책을 찾는다' },
      { id: 'B', text: '이 또한 여행의 일부라 생각하고 즐긴다' },
      { id: 'C', text: '미리 세워둔 대안 계획을 따른다' },
      { id: 'D', text: '크게 스트레스를 받고 계획이 틀어지는 것을 싫어한다' },
    ],
    height: "26rem",
  },
  {
    id: 19,
    text: "선호하는 여행 시기는 언제인가요?",
    options: [
      { id: 'A', text: '날씨가 좋은 성수기' },
      { id: 'B', text: '사람이 적고 한적한 비수기' },
      { id: 'C', text: '특별한 축제나 이벤트가 열리는 시기' },
      { id: 'D', text: '항공권이 저렴한 시기' },
    ],
    height: "26rem",
  },
  {
    id: 20,
    text: "여행의 추억을 어떤 방식으로?",
    options: [
      { id: 'A', text: '블로그나 SNS에 여행기를 꼼꼼하게 기록한다' },
      { id: 'B', text: '여행 영상을 만들어 편집한다' },
      { id: 'C', text: '모아온 기념품들을 보며 추억한다' },
      { id: 'D', text: '마음 속에만 간직한다' },
    ],
    height: "26rem",
  },
];

export function getShuffledQuestions(count: number = 10): Question[] {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...allQuizQuestions];
  let currentIndex = shuffled.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled.slice(0, count);
}
