"use client";

import React, { useEffect, useState } from "react";
import CatalogueCard from "../catalogue_card/page";
import { getTopFromCollection } from "@/data/functions";
import Product from "@/data/datatypes";
import LottieFallbackClient from "../loading_animation/LottieFallbackClient";
import Link from "next/link";

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
  }, []);

  return loadingFlag ? (
    <LottieFallbackClient />
  ) : (
    <div className="w-full flex flex-col items-center">
      <div className="flex p-4 items-baseline">
        <p className="w-full text-center font-bungee font-normal text-4xl bg-primary">
          {heading.split(/(?= )/)[0]}
        </p>
        <p className="w-full text-center font-bitcountsingle font-normal text-2xl bg-primary">
          {heading.split(/(?= )/)[1]}
        </p>
      </div>
      <div className="w-full grid grid-cols-2 p-4 gap-x-4 gap-y-6">
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
      <Link href={{ pathname: "/catalogue", query: { collection } }}>
        <button className="bg-black text-white text-md font-semibold p-2 rounded-xl active:scale-95 transition-all shadow-xl mt-6 mb-10">
          Show more
        </button>
      </Link>
    </div>
  );
};

export default Page;
