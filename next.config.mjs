import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  outputFileTracingRoot: fileURLToPath(new URL("./", import.meta.url)),
};

export default nextConfig;
