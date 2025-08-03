import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Genkit AI 관련 경고 완전 해결
    if (isServer) {
      // 서버 사이드에서만 적용되는 설정
      config.externals = config.externals || [];
      config.externals.push('@opentelemetry/exporter-jaeger');
      
      // Handlebars 관련 경고 해결
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // 클라이언트 사이드에서 Genkit 관련 모듈 제외
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Genkit 관련 모듈들을 무시하도록 설정
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /require\.extensions is not supported by webpack/,
      /Module not found: Can't resolve '@opentelemetry\/exporter-jaeger'/,
    ];
    
    return config;
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
