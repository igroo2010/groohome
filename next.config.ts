import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Next.js 15에서 변경된 설정명 (핵심 수정사항)
  serverExternalPackages: ['handlebars', '@genkit-ai/core', 'genkit'],
  
  // Webpack 설정으로 모든 경고 해결
  webpack: (config, { isServer }) => {
    // 빌드 로그에서 경고 제거
    config.infrastructureLogging = {
      level: 'error',
    };

    // 빌드 통계에서 경고 숨김
    config.stats = {
      warnings: false,
    };

    // OpenTelemetry 누락 모듈 문제 해결
    config.resolve.alias = {
      ...config.resolve.alias,
      '@opentelemetry/exporter-jaeger': false,
    };

    // Handlebars 관련 경고 무시 및 require.extensions 오류 해결
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      path: false,
      os: false,
    };

    // 외부 의존성 최적화
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
      };
    }

    return config;
  },

  // 텔레메트리 완전 비활성화
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    OTEL_SDK_DISABLED: 'true',
  },

  // 빌드 시 경고 레벨 조정
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'mdtpyoxczsphagzjptan.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/travel-images/**',
      },
      {
        protocol: 'https',
        hostname: 'mdtpyoxczsphagzjptan.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/result-images/**',
      },
    ],
  },
};

export default nextConfig;
