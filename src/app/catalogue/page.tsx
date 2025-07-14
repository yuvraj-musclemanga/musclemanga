import React, { Suspense } from "react";
import CataloguePageClient from "./cataloguePageClient";
import LottieFallbackClient from "../../components/loading_animation/LottieFallbackClient";

const Page = () => {
  return (
    <Suspense fallback={<LottieFallbackClient />}>
      <CataloguePageClient />
    </Suspense>
  );
};

export default Page;
