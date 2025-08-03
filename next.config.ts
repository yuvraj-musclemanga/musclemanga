import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["veqhqslmexogvhpvmwrd.supabase.co", "thumbs.dreamstime.com"],
  },
};

export default withNextVideo(nextConfig);