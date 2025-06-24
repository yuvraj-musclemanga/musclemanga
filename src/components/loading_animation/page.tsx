import Lottie from "lottie-react";
import animationData from "./loading.json";

const page = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} autoPlay={true} />
    </div>
  );
};

export default page;
