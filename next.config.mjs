/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    NEXT_PUBLIC_API_URL:process.env.API_URL,
  },
  redirects: () => {
    return [
      {
        source:"/admin",
        destination:"/admin/dashboard",
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secure-krill-horribly.ngrok-free.app',
        pathname: '/upload/img/*',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/upload/img/*',
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
