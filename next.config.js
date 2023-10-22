/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true
    },
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
        pathname: "/PokeAPI/**",
      },
      { hostname: "avatars.githubusercontent.com", protocol: "https" },
    ],
  },
};

module.exports = nextConfig;
