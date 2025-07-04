import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
