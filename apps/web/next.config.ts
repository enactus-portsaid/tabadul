import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ---------------------------------------------------------------------------
  // Experimental features
  // ---------------------------------------------------------------------------
  experimental: {
    // Optimize package imports for smaller client bundles
    optimizePackageImports: [
      'lucide-react',
      '@supabase/supabase-js',
      'class-variance-authority',
    ],
  },

  // ---------------------------------------------------------------------------
  // Image configuration
  // ---------------------------------------------------------------------------
  images: {
    remotePatterns: [
      {
        // Supabase Storage for user-uploaded images
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
