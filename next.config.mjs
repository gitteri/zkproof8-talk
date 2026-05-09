/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hide the dev "N" badge that sits in the corner. The runtime error overlay
  // is dev-only, so for the talk just use `pnpm talk` (production build).
  // (In Next 16 this can be `devIndicators: false` — switch when upgrading.)
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
