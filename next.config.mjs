/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚀 disables ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // (optional) disables TS errors during build
  },
};

export default nextConfig;
