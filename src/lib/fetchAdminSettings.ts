// 클라이언트에서 관리자 설정을 가져오기 위한 유틸리티

/**
 * (DEPRECATED) fetchAdminSettings는 더 이상 사용하지 않습니다.
 * 서버에서 관리자 설정이 필요하면 getAdminSettings()를 사용하세요.
 */
// export async function fetchAdminSettings() {
//   const res = await fetch('/api/admin-settings');
//   if (!res.ok) throw new Error('관리자 설정 불러오기 실패');
//   return res.json();
// }

// 클라이언트(프론트엔드)에서 관리자 설정을 받아올 때 사용
// 항상 /api/admin-settings에서 fetch해서 모델/키를 받아온다.
export async function fetchAdminSettings() {
  // 캐시 무효화를 위해 timestamp 추가
  const timestamp = Date.now();
  const res = await fetch(`/api/admin-settings?t=${timestamp}`, {
    cache: 'no-store' // 브라우저 캐시 방지
  });
  if (!res.ok) throw new Error('관리자 설정 불러오기 실패');
  return res.json();
} 