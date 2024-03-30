/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol:'https',
        hostname:"avatars.githubusercontent.com",
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
