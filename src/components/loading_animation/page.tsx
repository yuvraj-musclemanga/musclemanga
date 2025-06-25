"use Client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <DotLottieReact src="/animation.lottie" loop autoplay />
    </div>
  );
};

export default page;
