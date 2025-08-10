// 관리자 설정은 .env에서만 불러옴 (Supabase 불필요)

interface AdminSettings {
  text_model: string;
  text_model_apikey: string;
  image_model: string;
  image_model_apikey: string;
  title: string;
  imageUrl: string;
}

let cachedSettings: AdminSettings | null = null;
let lastFetched: number = 0;
const CACHE_TTL = 1000 * 60 * 5; // 5분

/**
 * 관리자 설정을 .env에서 한 번만 불러와 5분간 캐시합니다.
 * 모든 서버 코드에서 getAdminSettings()만 호출하면 중복 쿼리 없이 재사용됩니다.
 *
 * 캐시를 즉시 무효화하려면 clearAdminSettingsCache()를 호출하세요.
 */
export async function getAdminSettings(): Promise<AdminSettings> {
  const now = Date.now();
  if (cachedSettings && now - lastFetched < CACHE_TTL) {
    return cachedSettings;
  }
  // .env에서 직접 불러오기
  const data = {
    text_model: process.env.TEXT_MODEL || '',
    text_model_apikey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
    image_model: process.env.IMAGE_MODEL || '',
    image_model_apikey: process.env.IMAGE_API_KEY || '',
    title: process.env.ADMIN_TITLE || '',
    imageUrl: process.env.ADMIN_IMAGE_URL || '',
  };
  cachedSettings = data;
  lastFetched = now;
  return data;
}

/**
 * 관리자 설정 캐시를 즉시 무효화합니다.
 * (예: 관리자 설정 변경 후 최신값을 바로 반영하고 싶을 때 호출)
 */
export function clearAdminSettingsCache() {
  cachedSettings = null;
  lastFetched = 0;
} 