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
  // === Travel Philosophy & Motivation (1-8) ===
  {
    id: 1,
    text: "What do you value most in travel?",
    options: [
      { id: 'A', text: 'Complete rest and stress relief' },
      { id: 'B', text: 'Interaction with new cultures and people' },
      { id: 'C', text: 'Adventures that test your limits' },
      { id: 'D', text: 'Luxury and unique experiences' },
    ],
    height: "26rem",
  },
  {
    id: 2,
    text: "What is your ideal travel duration?",
    options: [
      { id: 'A', text: 'A short trip of 2-3 days' },
      { id: 'B', text: 'A relaxed schedule of about a week' },
      { id: 'C', text: 'An in-depth exploration of 2-3 weeks' },
      { id: 'D', text: 'A long stay of more than a month' },
    ],
    height: "26rem",
  },
  {
    id: 3,
    text: "What is the most important criterion when choosing a destination?",
    options: [
      { id: 'A', text: 'Convenient transportation and accessibility' },
      { id: 'B', text: 'Unique natural scenery' },
      { id: 'C', text: 'Rich history and culture' },
      { id: 'D', text: 'Local unique experiences' },
    ],
    height: "26rem",
  },
  {
    id: 4,
    text: "Who would you most like to travel with?",
    options: [
      { id: 'A', text: 'Traveling alone freely' },
      { id: 'B', text: 'Warm time with family' },
      { id: 'C', text: 'Romantic moments with a partner' },
      { id: 'D', text: 'Exciting adventures with friends' },
    ],
    height: "26rem",
  },
  {
    id: 5,
    text: "What is your travel planning style?",
    options: [
      { id: 'A', text: 'Thorough planning down to the details' },
      { id: 'B', text: 'Set the big picture, be flexible locally' },
      { id: 'C', text: 'Spontaneous and free' },
      { id: 'D', text: 'Leave it to a professional guide or local' },
    ],
    height: "26rem",
  },
  {
    id: 6,
    text: "What is your most memorable travel moment?",
    options: [
      { id: 'A', text: 'Quiet rest and relaxation' },
      { id: 'B', text: 'Genuine interaction with locals' },
      { id: 'C', text: 'Unexpected amazing discoveries' },
      { id: 'D', text: 'Unique and special experiences' },
   ],
    height: "26rem",
  },
  {
    id: 7,
    text: "How do you prefer to spend a day at your destination?",
    options: [
      { id: 'A', text: 'Start leisurely, wake up late' },
      { id: 'B', text: 'Active exploration from the morning' },
      { id: 'C', text: 'Active in the morning, rest in the afternoon' },
      { id: 'D', text: 'Energetic activities late into the night' },
    ],
    height: "26rem",
  },
  {
    id: 8,
    text: "How do you judge the success of a trip?",
    options: [
      { id: 'A', text: 'Complete recharge of body and mind' },
      { id: 'B', text: 'Abundance of new learning and experiences' },
      { id: 'C', text: 'Perfect execution of planned schedule' },
      { id: 'D', text: 'Special satisfaction beyond expectations' },
    ],
    height: "26rem",
  },

  // === 환경 및 자연 선호도 (9-20번) ===
  {
    id: 9,
    text: "What is the most calming natural environment for you?",
    options: [
      { id: 'A', text: 'Beach with waves crashing' },
      { id: 'B', text: 'Forest with birds chirping' },
      { id: 'C', text: 'Wide open grasslands and plains' },
      { id: 'D', text: 'Quiet lakes or riverside' },
    ],
    height: "26rem",
  },
  {
    id: 10,
    text: "What climate style do you prefer?",
    options: [
      { id: 'A', text: 'Tropical climate with lots of sunshine' },
      { id: 'B', text: 'Temperate climate with clear weather' },
      { id: 'C', text: 'Arid and hot desert climate' },
      { id: 'D', text: 'Cold and refreshing mountain climate' },
    ],
    height: "26rem",
  },
  {
    id: 11,
    text: "Which water-related activity do you find most appealing?",
    options: [
      { id: 'A', text: 'Snorkeling or diving in the sea' },
      { id: 'B', text: 'Rafting or surfing in the river' },
      { id: 'C', text: 'Kayaking or paddleboarding in the lake' },
      { id: 'D', text: 'Relaxing in hot springs' },
    ],
    height: "26rem",
  },
  {
    id: 12,
    text: "What is the most appealing activity in the mountains?",
    options: [
      { id: 'A', text: 'Challenging hiking to the peak' },
      { id: 'B', text: 'Enjoying the peak view from cable car' },
      { id: 'C', text: 'Local experience in the mountain village' },
      { id: 'D', text: 'Camping and stargazing in the mountains' },
    ],
    height: "26rem",
  },
  {
    id: 13,
    text: "What unusual terrain would you like to explore?",
    options: [
      { id: 'A', text: 'Wide desert and sand dunes' },
      { id: 'B', text: 'Mystical caves and underground world' },
      { id: 'C', text: 'Thick tropical rainforest' },
      { id: 'D', text: 'Snow-covered glaciers and polar regions' },
    ],
    height: "26rem",
  },
  {
    id: 14,
    text: "What is the most important element in island travel?",
    options: [
      { id: 'A', text: 'Clear and transparent sea' },
      { id: 'B', text: 'Quiet and quiet atmosphere' },
      { id: 'C', text: 'Various ocean sports' },
      { id: 'D', text: 'Island culture and cuisine' },
    ],
    height: "26rem",
  },
  {
    id: 15,
    text: "What do you expect from meeting wild animals?",
    options: [
      { id: 'A', text: 'Safely observing and taking photos' },
      { id: 'B', text: 'Learning about animal ecology and nature' },
      { id: 'C', text: 'Direct contact and experience by touching' },
      { id: 'D', text: 'The thrill of discovering rare animals' },
    ],
    height: "26rem",
  },
  {
    id: 16,
    text: "What is your attitude towards extreme environments?",
    options: [
      { id: 'A', text: 'I want to try exciting experiences' },
      { id: 'B', text: 'I can try if safety is guaranteed' },
      { id: 'C', text: 'I\'m satisfied just by watching documentaries' },
      { id: 'D', text: 'I want to avoid dangerous environments' },
    ],
    height: "26rem",
  },
  {
    id: 17,
    text: "What is your favorite place to enjoy sunrise or sunset?",
    options: [
      { id: 'A', text: 'Sunrise or sunset over the sea horizon' },
      { id: 'B', text: 'Majestic view from mountain peak' },
      { id: 'C', text: 'Red sunset in the desert' },
      { id: 'D', text: 'Sunset with city skyline' },
    ],
    height: "26rem",
  },
  {
    id: 18,
    text: "What is your attitude towards natural disasters or risks?",
    options: [
      { id: 'A', text: 'Complete safety measures are needed' },
      { id: 'B', text: 'It\'s enough with basic preparation' },
      { id: 'C', text: 'I accept it as part of adventure' },
      { id: 'D', text: 'I want to exclude dangerous areas from travel' },
    ],
    height: "26rem",
  },
  {
    id: 19,
    text: "What is your preference for travel in seasons?",
    options: [
      { id: 'A', text: 'Tropical climate' },
      { id: 'B', text: 'Region with distinct four seasons' },
      { id: 'C', text: 'Snow-covered winter landscape' },
      { id: 'D', text: 'Spring flowers or fall foliage' },
    ],
    height: "26rem",
  },
  {
    id: 20,
    text: "What is your camping style in nature?",
    options: [
      { id: 'A', text: 'Enjoying wild camping with a tent' },
      { id: 'B', text: 'Glamping for both nature and comfort' },
      { id: 'C', text: 'Eco resort relaxation in eco-friendly' },
      { id: 'D', text: 'Enjoy nature but stay in hotel' },
    ],
    height: "26rem",
  },

  // === 문화 및 인문학적 관심사 (21-30번) ===
  {
    id: 21,
    text: "What is the most interesting part you are interested in when visiting historical sites?",
    options: [
      { id: 'A', text: 'Majestic architecture and technology' },
      { id: 'B', text: 'Life and stories of ancient people' },
      { id: 'C', text: 'Historical site of important events' },
      { id: 'D', text: 'Mystery atmosphere of relics and ruins' },
    ],
    height: "26rem",
  },
  {
    id: 22,
    text: "What do you expect from local culture experience?",
    options: [
      { id: 'A', text: 'Traditional craft or clothing experience' },
      { id: 'B', text: 'Dinner at local family' },
      { id: 'C', text: 'Learning traditional dance or music' },
      { id: 'D', text: 'Participating in traditional festival or ceremony' },
    ],
    height: "26rem",
  },
  {
    id: 23,
    text: "What is your style of visiting museums or art galleries?",
    options: [
      { id: 'A', text: 'Thorough exploration guided tour' },
      { id: 'B', text: 'Selectively enjoying interesting exhibitions' },
      { id: 'C', text: 'Enjoying atmosphere while browsing' },
      { id: 'D', text: 'Experiencing program or special exhibition' },
    ],
    height: "26rem",
  },
  {
    id: 24,
    text: "What is your approach to local language communication?",
    options: [
      { id: 'A', text: 'Basic conversational learning before travel' },
      { id: 'B', text: 'Learning briefly in local' },
      { id: 'C', text: 'Communication with body language or app' },
      { id: 'D', text: 'Only possible in English or Korean' },
    ],
    height: "26rem",
  },
  {
    id: 25,
    text: "What is your attitude when visiting religious sites?",
    options: [
      { id: 'A', text: 'Respectfully visiting with courtesy' },
      { id: 'B', text: 'Focus on architecture and artistic value' },
      { id: 'C', text: 'Observing local people\'s faith' },
      { id: 'D', text: 'Only recognize as tourist spot' },
    ],
    height: "26rem",
  },
  {
    id: 26,
    text: "What do you want from communication with locals?",
    options: [
      { id: 'A', text: 'Deep conversation about culture' },
      { id: 'B', text: 'Casual casual meeting' },
      { id: 'C', text: 'Local information and recommended place' },
      { id: 'D', text: 'Simple greeting or photo taking' },
    ],
    height: "26rem",
  },
  {
    id: 27,
    text: "What is the main purpose of visiting traditional markets?",
    options: [
      { id: 'A', text: 'Observing local people\'s life' },
      { id: 'B', text: 'Tasting special products and food' },
      { id: 'C', text: 'Buying souvenirs' },
      { id: 'D', text: 'Enjoying lively market atmosphere' },
    ],
    height: "26rem",
  },
  {
    id: 28,
    text: "What is your participation style in festival?",
    options: [
      { id: 'A', text: 'Enjoying and participating directly' },
      { id: 'B', text: 'Enjoying atmosphere while watching' },
      { id: 'C', text: 'Recording with photos and videos' },
      { id: 'D', text: 'Exploring history and meaning of festival' },
    ],
    height: "26rem",
  },
  {
    id: 29,
    text: "What is your preferred style for enjoying art performance?",
    options: [
      { id: 'A', text: 'Traditional art and folk performance' },
      { id: 'B', text: 'Modern and experimental art' },
      { id: 'C', text: 'Classical music or opera' },
      { id: 'D', text: 'Popular and accessible performance' },
    ],
    height: "26rem",
  },
  {
    id: 30,
    text: "What is your reaction to cultural differences?",
    options: [
      { id: 'A', text: 'Feel like there are many things to learn' },
      { id: 'B', text: 'Confused but gradually adapting' },
      { id: 'C', text: 'Admit differences and maintain distance' },
      { id: 'D', text: 'Feel uncomfortable and want to avoid' },
    ],
    height: "26rem",
  },

  // === 활동 및 체험 선호도 (31-42번) ===
  {
    id: 31,
    text: "What is your preferred physical activity intensity?",
    options: [
      { id: 'A', text: 'Intense sports and adventure' },
      { id: 'B', text: 'Appropriate exercise amount' },
      { id: 'C', text: 'Walking or light walking' },
      { id: 'D', text: 'Minimum movement and rest' },
    ],
    height: "26rem",
  },
  {
    id: 32,
    text: "What do you think is important in food experience?",
    options: [
      { id: 'A', text: 'Unique taste of local' },
      { id: 'B', text: 'Fresh and healthy ingredients' },
      { id: 'C', text: 'Familiar and suitable food' },
      { id: 'D', text: 'Visual beauty of food' },
    ],
    height: "26rem",
  },
  {
    id: 33,
    text: "What is your challenge desire for new food?",
    options: [
      { id: 'A', text: 'I want to try all food' },
      { id: 'B', text: 'Only challenge recommended food' },
      { id: 'C', text: 'Only familiar food' },
      { id: 'D', text: 'Focus on familiar food' },
    ],
    height: "26rem",
  },
  {
    id: 34,
    text: "What do you prefer when buying souvenirs?",
    options: [
      { id: 'A', text: 'Local specialty' },
      { id: 'B', text: 'Practical item' },
      { id: 'C', text: 'Souvenir to recall memories' },
      { id: 'D', text: 'Experience priority' },
    ],
    height: "26rem",
  },
  {
    id: 35,
    text: "What is your travel photography style?",
    options: [
      { id: 'A', text: 'Record every moment' },
      { id: 'B', text: 'Take photos only at special moments' },
      { id: 'C', text: 'Focus on artistic landscape photography' },
      { id: 'D', text: 'Prefer direct experience' },
    ],
    height: "26rem",
  },
  {
    id: 36,
    text: "What is your priority when choosing transportation?",
    options: [
      { id: 'A', text: 'Quick and convenient travel' },
      { id: 'B', text: 'Enjoying scenery travel leisurely' },
      { id: 'C', text: 'Travel to feel local culture' },
      { id: 'D', text: 'Unique and memorable travel' },
    ],
    height: "26rem",
  },
  {
    id: 37,
    text: "What is the most important factor when choosing accommodation?",
    options: [
      { id: 'A', text: 'Clean and comfortable environment' },
      { id: 'B', text: 'Reflecting local culture' },
      { id: 'C', text: 'Beautiful scenery and location' },
      { id: 'D', text: 'Unique concept accommodation' },
    ],
    height: "26rem",
  },
  {
    id: 38,
    text: "How do you spend your rest time during travel?",
    options: [
      { id: 'A', text: 'Complete rest in accommodation' },
      { id: 'B', text: 'Enjoy leisurely time in cafe' },
      { id: 'C', text: 'Walking around and exploring' },
      { id: 'D', text: 'Preparing for next schedule' },
    ],
    height: "26rem",
  },
  {
    id: 39,
    text: "What is your alternative activity when the weather is not good?",
    options: [
      { id: 'A', text: 'Visiting museum or indoor tourist spot' },
      { id: 'B', text: 'Enjoying in cafe or restaurant' },
      { id: 'C', text: 'Shopping or exploring market' },
      { id: 'D', text: 'Resting in accommodation' },
    ],
    height: "26rem",
  },
  {
    id: 40,
    text: "What is your attitude towards health management during travel?",
    options: [
      { id: 'A', text: 'Maintaining healthy diet and exercise' },
      { id: 'B', text: 'Maintaining condition with appropriate activity' },
      { id: 'C', text: 'Enjoy during travel' },
      { id: 'D', text: 'Enjoyment and experience priority' },
    ],
    height: "26rem",
  },
  {
    id: 41,
    text: "What is your response to unexpected situations?",
    options: [
      { id: 'A', text: 'Calmly find a solution' },
      { id: 'B', text: 'Accept as interesting episode' },
      { id: 'C', text: 'Execute alternative plan' },
      { id: 'D', text: 'Request help from local or expert' },
    ],
    height: "26rem",
  },
  {
    id: 42,
    text: "What do you expect from travel to learn and grow?",
    options: [
      { id: 'A', text: 'Growth with new knowledge and experience' },
      { id: 'B', text: 'I like it if I learn naturally' },
      { id: 'C', text: 'Relaxation is priority, learning is burden' },
      { id: 'D', text: 'Selective learning from interesting things' },
    ],
    height: "26rem",
  },

  // === 라이프스타일 및 개인 성향 (43-50번) ===
  {
    id: 43,
    text: "What is your way of spending your free time?",
    options: [
      { id: 'A', text: 'Resting at home and recharging' },
      { id: 'B', text: 'Going out to nearby places' },
      { id: 'C', text: 'Actively with friends' },
      { id: 'D', text: 'Exploring new places' },
    ],
    height: "26rem",
  },
  {
    id: 44,
    text: "What is the most effective way to relieve stress?",
    options: [
      { id: 'A', text: 'Enough rest and sleep' },
      { id: 'B', text: 'Exercise or physical activity' },
      { id: 'C', text: 'Conversation and meeting with friends' },
      { id: 'D', text: 'Hobby or new challenge' },
    ],
    height: "26rem",
  },
  {
    id: 45,
    text: "What is your attitude towards meeting new people?",
    options: [
      { id: 'A', text: 'Actively getting close' },
      { id: 'B', text: 'I\'m naturally close if the other person approaches' },
      { id: 'C', text: 'I\'m willing to have a minimum conversation' },
      { id: 'D', text: 'I prefer alone time' },
    ],
    height: "26rem",
  },
  {
    id: 46,
    text: "What is your adaptability to new environments?",
    options: [
      { id: 'A', text: 'I enjoy change and adapt quickly' },
      { id: 'B', text: 'I\'m a little awkward but gradually adapting' },
      { id: 'C', text: 'It takes time to adapt' },
      { id: 'D', text: 'I prefer familiar environment' },
    ],
    height: "26rem",
  },
  {
    id: 47,
    text: "What is your attitude towards risky or adventurous activities?",
    options: [
      { id: 'A', text: 'I enjoy the thrill of adventure' },
      { id: 'B', text: 'I can try if safety is guaranteed' },
      { id: 'C', text: 'I only try verified activities' },
      { id: 'D', text: 'I prefer safe activities' },
    ],
    height: "26rem",
  },
  {
    id: 48,
    text: "What is your tendency in time management and planning?",
    options: [
      { id: 'A', text: 'Thorough planning and preparation' },
      { id: 'B', text: 'Set the big picture, be flexible' },
      { id: 'C', text: 'Minimum preparation for spontaneous' },
      { id: 'D', text: 'Dislike planning' },
    ],
    height: "26rem",
  },
  {
    id: 49,
    text: "Which do you value more, experience or material possessions?",
    options: [
      { id: 'A', text: 'Experience is the most valuable asset' },
      { id: 'B', text: 'I can invest for a good experience' },
      { id: 'C', text: 'I consider both experience and practicality' },
      { id: 'D', text: 'I value practical value more' },
    ],
    height: "26rem",
  },
  {
    id: 50,
    text: "What do you want to get from travel ultimately?",
    options: [
      { id: 'A', text: 'Stress relief and complete rest' },
      { id: 'B', text: 'New insight and inspiration' },
      { id: 'C', text: 'Unique experience that lasts a lifetime' },
      { id: 'D', text: 'Memories with precious people' },
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

