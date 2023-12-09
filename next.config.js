/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async()=>{
      return [{
        source: "/",
        destination: "/home",
        permanent: true
      }]
    },
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
        pathname: "/PokeAPI/**",
      },
      { hostname: "avatars.githubusercontent.com", protocol: "https" },
      {hostname: "gmuy9ecqqb0gs5lv.public.blob.vercel-storage.com", protocol: "https"},
      {hostname: "www.iestrassierra.com", protocol: "https"}
    ],
  },
};

module.exports = nextConfig;
