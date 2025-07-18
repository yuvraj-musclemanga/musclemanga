import React, { Suspense } from "react";
import ProductPageClient from "./productPageClient";
import LottieFallbackClient from "../../components/loading_animation/LottieFallbackClient";

const Page = () => {
  return (
    <Suspense fallback={<LottieFallbackClient />}>
      <ProductPageClient />
    </Suspense>
  );
};

export default Page;
