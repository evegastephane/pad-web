import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  async redirects() {
    return [
      { source: "/le-pad", destination: "/le-pad/presentation", permanent: true },
      { source: "/a-propos-du-pad", destination: "/le-pad/presentation", permanent: true },
      { source: "/breve-histoire-du-pad-port-autonome-de-douala", destination: "/le-pad/histoire", permanent: true },
      { source: "/capacites", destination: "/infrastructures", permanent: true },
      { source: "/acces-pro", destination: "/liens-utiles", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
