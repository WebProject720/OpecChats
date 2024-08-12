/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  env: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_PATH,
  },
};

export default nextConfig;
