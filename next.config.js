/** @type {import('next').NextConfig} */
const headers = require("./headers");
const execSync = require("child_process").execSync;
const lastCommitCommand = "git rev-parse HEAD";

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "surabaya.go.id"],
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
  async generateBuildId() {
    return execSync(lastCommitCommand).toString().trim();
  },
};
