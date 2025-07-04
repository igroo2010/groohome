import { WanderPersonaApp } from '@/components/wander-persona-app';
import Image from 'next/image';
// import { db } from '@/lib/firebase'; // db를 임포트
// import { doc, getDoc } from 'firebase/firestore'; // Firestore 함수 임포트

export default async function HomePage() {
  // 임시로 히어로 이미지 로딩 비활성화
  const heroImageUrl: string | null = null;

  /*
  // 서버 시작 문제 해결을 위해 이 부분을 임시로 주석 처리합니다.
  // Firebase 환경 변수가 올바르게 설정되면 주석을 해제하세요.
  try {
    const docRef = doc(db, 'app_settings', 'hero_image');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      heroImageUrl = docSnap.data().imageUrl || null;
    }
  } catch (error) {
    console.error('Error fetching hero image:', error);
  }
  */

  return (
    <div>
      {heroImageUrl && (
        <div className="mb-8 flex justify-center">
          <Image
            src={heroImageUrl}
            alt="Hero Image"
            width={600}
            height={400}
            className="object-cover rounded-lg shadow-md"
            priority // 히어로 이미지 로딩 우선순위 높이기
          />
        </div>
      )}
      <WanderPersonaApp />
    </div>
  );
}
