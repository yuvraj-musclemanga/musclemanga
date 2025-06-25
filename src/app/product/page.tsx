import React, { Suspense } from "react";
import ProductPageClient from "./productPageClient";
import Loading from "../../components/loading_animation/page";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductPageClient />
    </Suspense>
  );
};

export default Page;
