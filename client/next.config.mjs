/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // ✅ Enable React Strict Mode for debugging & better rendering
//   reactStrictMode: true,

//   // ✅ Optimize images from remote sources & improve performance
//   images: {
//     domains: ["images.unsplash.com", "socialface.s3.eu-north-1.amazonaws.com"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // Allow images from any HTTPS source (use specific domains for security)
//       },
//     ],
//     minimumCacheTTL: 60 * 60 * 24 * 30, // ✅ Cache images for 30 days
//   },

//   // ✅ Reduce JS bundle size for better performance
//   compiler: {
//     // removeConsole: process.env.NODE_ENV === "production",
//     styledComponents: true, // Optimize styled-components (if used)
//   },

//   // ✅ Enable SWC minification (faster than Terser)
//   swcMinify: true,

//   // ✅ Page-level caching for improved performance
//   async headers() {
//     return [
//       {
//         source: "/(.*)", // Apply to all routes
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable",
//           }, // Cache assets for 1 year
//           { key: "X-Frame-Options", value: "DENY" }, // Prevent clickjacking attacks
//           { key: "X-Content-Type-Options", value: "nosniff" }, // Prevent MIME-type sniffing
//           { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Secure referrer policy
//         ],
//       },
//     ];
//   },

//   // ✅ Enable Webpack 5 and optimize bundling
//   webpack(config, { isServer }) {
//     if (!isServer) {
//       config.resolve.fallback = {
//         fs: false, // Prevents issues when running in a browser
//       };
//     }
//     return config;
//   },

//   // ✅ Enable experimental features for better performance
//   experimental: {
//     scrollRestoration: true, // Maintain scroll position on route changes
//     optimizeCss: true, // Minify & optimize CSS files
//     serverComponentsExternalPackages: ["@some-large-library"], // Optimize large libraries for better performance
//   },

//   // ✅ Optimize font loading
//   optimizeFonts: true,

//   // ✅ Improve API route performance with edge functions
//   runtime: "experimental-edge", // Deploys API routes as Edge Functions for lower latency

//   // ✅ Enable internationalization (i18n) support if needed
//   i18n: {
//     locales: ["en", "es", "fr"], // Supported languages
//     defaultLocale: "en", // Default language
//   },

//   // ✅ Custom redirects (optional)
//   async redirects() {
//     return [
//       {
//         source: "/old-route",
//         destination: "/new-route",
//         permanent: true, // 301 redirect
//       },
//     ];
//   },

//   // ✅ Custom rewrites (optional)
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "https://your-backend.com/:path*", // Proxy API requests
//       },
//     ];
//   },
// };

// export default nextConfig;
