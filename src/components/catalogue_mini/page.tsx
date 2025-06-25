"use client";

import React, { useEffect, useState } from "react";
import CatalogueCard from "../catalogue_card/page";
import { getTopFromCollection } from "@/data/functions";
import Product from "@/data/datatypes";
import LottieFallbackClient from "../loading_animation/LottieFallbackClient";

const Page = ({
  heading,
  collection,
}: {
  heading: string;
  collection: string;
}) => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loadingFlag, setLoadingFlag] = useState(true);

  useEffect(() => {
    getTopFromCollection(collection).then((data) => {
      setProductsData(data);
      setLoadingFlag(false);
    });
  });

  return loadingFlag ? (
    <LottieFallbackClient />
  ) : (
    <div className="w-full flex flex-col">
      <p className="w-full text-center font-[playfair] text-3xl bg-primary p-4">
        {heading}
      </p>
      <div className="w-full grid grid-cols-2 p-4 gap-x-1.5 gap-y-6">
        {productsData.map((productData: Product, index) => (
          <CatalogueCard
            card_image={productData.thumbnail}
            name={productData.name}
            key={index}
            id={productData.id}
            price={productData.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
