import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Genkit AI 최적화: Firebase 관련 모듈 빌드 경고 억제
  webpack: (config, { isServer, dev }) => {
    // 개발 환경에서 Turbopack 사용시 웹팩 설정 건너뛰기
    if (dev) {
      return config;
    }
    
    // 환경 변수로 OpenTelemetry 비활성화
    config.plugins.push(
      new (require('webpack')).DefinePlugin({
        'process.env.OTEL_SDK_DISABLED': JSON.stringify('true'),
        'process.env.GENKIT_ENV': JSON.stringify('prod'),
      })
    );
    
    if (!isServer) {
      // Firebase 및 OpenTelemetry 관련 선택적 의존성 무시
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@genkit-ai/firebase': false,
        '@opentelemetry/exporter-jaeger': false,
        '@opentelemetry/exporter-prometheus': false,
        '@opentelemetry/exporter-zipkin': false,
        'handlebars': false,
      };
    }
    
    // NormalModuleReplacementPlugin으로 문제가 되는 모듈들을 빈 객체로 교체
    config.plugins.push(
      new (require('webpack')).NormalModuleReplacementPlugin(
        /@genkit-ai\/firebase/,
        require.resolve('./src/lib/empty-module.js')
      ),
      new (require('webpack')).NormalModuleReplacementPlugin(
        /@opentelemetry\/exporter-jaeger/,
        require.resolve('./src/lib/empty-module.js')
      )
    );
    
    // Genkit 관련 경고 완전 억제
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Can't resolve '@genkit-ai\/firebase'/,
      /Module not found: Can't resolve '@opentelemetry\/exporter-jaeger'/,
      /require\.extensions is not supported by webpack/,
      /Can't resolve 'handlebars'/,
    ];
    
    return config;
  },
  // Turbopack 설정 (안정화됨)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // 개발 환경에서 Cross Origin 요청 허용
  allowedDevOrigins: [
    '192.168.1.114',
    '192.168.1.*',
    'localhost',
    '127.0.0.1',
  ],
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
