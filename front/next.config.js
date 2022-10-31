/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://k7e201.p.ssafy.io/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
