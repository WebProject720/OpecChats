/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  env: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_PATH,
    i_icon:'https://img.icons8.com/?size=100&id=63308&format=png&color=000000'
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '', // You can specify a port if needed, otherwise leave it as an empty string
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // You can specify a port if needed, otherwise leave it as an empty string
        pathname: '/**'
      }
    ],
  }
};

export default nextConfig;
