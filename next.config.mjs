/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove the problematic webpack alias configuration
  // webpack: (config, { isServer }) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "react/jsx-runtime": "react/jsx-runtime.js",
  //     "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
  //   };
  //
  //   return config;
  // },
};

export default nextConfig;