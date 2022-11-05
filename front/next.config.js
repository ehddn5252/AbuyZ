/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // publicRuntimeConfig: {
  //   apiBaseUrl: "https://k7e201.p.ssafy.io:8081/api",
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://k7e201.p.ssafy.io:8081/api/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
