/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["images.unsplash.com", "socialface.s3.eu-north-1.amazonaws.com"],
  },
};

export default nextConfig;
