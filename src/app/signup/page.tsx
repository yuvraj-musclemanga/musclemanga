import React, { Suspense } from "react";
import SignupPage from "./signupClient";
import LottieFallbackClient from "../../components/loading_animation/LottieFallbackClient";

const page = () => {
  return (
    <Suspense fallback={<LottieFallbackClient />}>
      <SignupPage />
    </Suspense>
  );
};

export default page;
