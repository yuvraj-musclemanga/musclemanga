"use client";

import React, { useEffect, useState } from "react";
import CatalogueCard from "../../components/catalogue_card/page";
import { getFullCatalogue } from "@/data/functions";
import Product from "@/data/datatypes";
import LottieFallbackClient from "@/components/loading_animation/LottieFallbackClient";
import { useSearchParams } from "next/navigation";

const CataloguePageClient = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const searchParams = useSearchParams();
  const collection: string = searchParams.get("collection") || "";

  useEffect(() => {
    getFullCatalogue(collection).then((data) => {
      setProductsData(data);
      setLoadingFlag(false);
    });
  }, []);

  return loadingFlag ? (
    <LottieFallbackClient />
  ) : (
    <div className="w-full grid grid-cols-2 p-4 gap-x-1.5 gap-y-6">
      {productsData.map((productData: Product, index) => (
        <CatalogueCard
          key={index}
          card_image={productData.thumbnail}
          name={productData.name}
          id={productData.id}
          price={productData.price}
        />
      ))}
    </div>
  );
};

export default CataloguePageClient;
