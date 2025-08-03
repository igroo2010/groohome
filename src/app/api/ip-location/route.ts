import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 클라이언트 IP 주소 가져오기 (개선된 로직)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const xRealIp = req.headers.get('x-real-ip');
    
    // IP 주소 추출 로직 개선
    let ip = '';
    
    // 1. Cloudflare IP
    if (cfConnectingIp) {
      ip = cfConnectingIp;
    }
    // 2. X-Real-IP
    else if (realIp || xRealIp) {
      ip = realIp || xRealIp || '';
    }
    // 3. X-Forwarded-For (첫 번째 IP)
    else if (forwarded || xForwardedFor) {
      const forwardedIp = forwarded || xForwardedFor || '';
      ip = forwardedIp.split(',')[0].trim();
    }
    
    // IP 주소 유효성 검사 (개발 환경에서는 로컬 IP도 허용)
    const isLocalIp = ip === '::1' || ip === '127.0.0.1' || ip === 'localhost' || 
                     ip.startsWith('::ffff:192.168.') || ip.startsWith('::ffff:10.') || 
                     ip.startsWith('::ffff:172.') || ip.startsWith('192.168.') || 
                     ip.startsWith('10.') || ip.startsWith('172.');
    const isValidIp = ip && !isLocalIp;
    
    console.log('[IP Location] 추출된 IP:', {
      ip,
      isValidIp,
      isLocalIp,
      headers: {
        'x-forwarded-for': forwarded,
        'x-real-ip': realIp,
        'cf-connecting-ip': cfConnectingIp
      }
    });

    // 로컬 IP인 경우 외부 IP 조회 시도
    if (isLocalIp) {
      console.log('[IP Location] 로컬 IP 감지, 외부 IP 조회 시도');
      try {
        // 외부 IP 조회 API 사용
        const externalResponse = await fetch('https://api.ipify.org?format=json');
        if (externalResponse.ok) {
          const externalData = await externalResponse.json();
          const externalIp = externalData.ip;
          console.log('[IP Location] 외부 IP 조회 성공:', externalIp);
          
                     // 외부 IP로 위치 정보 조회 (더 안정적인 API 사용)
           const locationResponse = await fetch(`https://ipapi.co/${externalIp}/json/`, {
             method: 'GET',
             headers: {
               'Accept': 'application/json',
               'User-Agent': 'GrooHome-App/1.0'
             }
           });
           
           if (locationResponse.ok) {
             const contentType = locationResponse.headers.get('content-type');
             if (contentType && contentType.includes('application/json')) {
                               const data = await locationResponse.json();
                console.log('[IP Location] 외부 IP 위치 정보 (전체 데이터):', JSON.stringify(data, null, 2));
                console.log('[IP Location] 외부 IP 위치 정보 (주요 필드):', {
                  country: data.country,
                  region: data.region,
                  regionName: data.regionName,
                  city: data.city,
                  state: data.state,
                  area: data.area,
                  timezone: data.timezone
                });
                
                // ipapi.co API 응답 구조에 맞게 처리
                if (data && data.country) {
                  const result = {
                    state: data.region || data.regionName || data.state || 'Unknown',
                    country: data.country || 'US',
                    city: data.city || 'Unknown'
                  };
                  
                  console.log('[IP Location] 외부 IP 최종 결과:', result);
                  return NextResponse.json(result);
                } else {
                  console.error('[IP Location] 외부 IP 데이터에 country 필드 없음:', data);
                }
             }
           }
        }
      } catch (externalError) {
        console.error('[IP Location] 외부 IP 조회 실패:', externalError);
      }
      
      // 외부 IP 조회 실패 시 기본값 반환
      return NextResponse.json({ 
        state: 'Unknown',
        country: 'US'
      });
    }

    if (!isValidIp) {
      console.log('[IP Location] 유효하지 않은 IP');
      return NextResponse.json({ 
        state: 'Unknown',
        country: 'US'
      });
    }

    // IP Geolocation API 호출 (무료 서비스 사용)
    console.log('[IP Location] API 호출 시작, IP:', ip);
    
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'GrooHome-App/1.0'
        }
      });
      
      console.log('[IP Location] API 응답 상태:', response.status);
      
      if (!response.ok) {
        console.error('[IP Location] API 호출 실패:', response.status, response.statusText);
        return NextResponse.json({ 
          state: 'Unknown',
          country: 'US'
        });
      }

      const contentType = response.headers.get('content-type');
      console.log('[IP Location] 응답 Content-Type:', contentType);
      
      if (!contentType || !contentType.includes('application/json')) {
        console.error('[IP Location] JSON 응답이 아님:', contentType);
        return NextResponse.json({ 
          state: 'Unknown',
          country: 'US'
        });
      }

      const data = await response.json();
      console.log('[IP Location] API 응답 데이터 (전체):', JSON.stringify(data, null, 2));
      console.log('[IP Location] API 응답 데이터 (주요 필드):', {
        country: data.country,
        region: data.region,
        regionName: data.regionName,
        city: data.city,
        state: data.state,
        area: data.area,
        timezone: data.timezone
      });

      // ipapi.co API 응답 구조에 맞게 처리
      if (data && data.country) {
        const result = {
          state: data.region || data.regionName || data.state || 'Unknown',
          country: data.country || 'US',
          city: data.city || 'Unknown'
        };
        
        console.log('[IP Location] 최종 결과:', result);
        return NextResponse.json(result);
      } else {
        console.error('[IP Location] API 응답 데이터 오류 - country 필드 없음:', data);
        return NextResponse.json({ 
          state: 'Unknown',
          country: 'US'
        });
      }
    } catch (apiError) {
      console.error('[IP Location] API 호출 중 오류:', apiError);
      return NextResponse.json({ 
        state: 'Unknown',
        country: 'US'
      });
    }
  } catch (error) {
    console.error('[IP Location] 오류:', error);
    return NextResponse.json({ 
      state: 'Unknown',
      country: 'US'
    });
  }
} 