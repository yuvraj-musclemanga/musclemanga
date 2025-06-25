import React, { Suspense } from "react";
import SignupPage from "./loginClient";
import LottieFallbackClient from "../../components/loading_animation/LottieFallbackClient";

const page = () => {
  return (
    <Suspense fallback={<LottieFallbackClient />}>
      <SignupPage />
    </Suspense>
  );
};

export default page;
