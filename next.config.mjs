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
