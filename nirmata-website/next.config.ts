/**
 * NOTE: This file is not currently used. The project uses next.config.js instead.
 * This file is kept for reference and future TypeScript migration.
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  
  // UploadThing configuration
  // Note: UploadThing requires server-side capabilities. 
  // Remove "output: export" when implementing file uploads.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  
  // CORS and headers configuration for file uploads
  // Note: Restrict Access-Control-Allow-Origin to specific domains in production
  async headers() {
    return [
      {
        source: "/api/uploadthing",
        headers: [
          { key: "Access-Control-Allow-Origin", value: process.env.ALLOWED_UPLOAD_ORIGIN || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
