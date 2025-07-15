"use Client";
import animationData from "./animation.json";
import Lottie from "lottie-react";

const page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default page;
