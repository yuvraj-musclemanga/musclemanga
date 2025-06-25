"use client";
import dynamic from "next/dynamic";

const LottieComponent = dynamic(() => import("./page"), {
  ssr: false,
});

export default function LottieFallbackClient() {
  return <LottieComponent />;
}
