/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
        protocol: "https",
      },
      {
        hostname: "s4.anilist.co",
        protocol: "https",
      },
    ],
  },
  redirects: async function () {
    return [
      {
        source: "/",
        destination: "/anime/list",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
