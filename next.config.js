/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async()=>{
      return [{
        source: "/",
        destination: "/home",
        permanent: true
      }]
    },
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
