import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = ({
  card_image,
  name,
  id,
  price,
}: {
  card_image: string;
  name: string;
  id: string;
  price: number;
}) => {
  return (
    <Link href={{ pathname: "/product", query: { product: id } }}>
      <div className="w-full flex flex-col">
        <div className="relative w-full aspect-[4/5]">
          <Image
            src={card_image}
            alt="card image"
            fill
            className="w-full h-full object-cover py-4 bg-gray-200 rounded-3xl"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-josefin font-normal text-md text-center">
            {name} | Oversized Tee | Unisex
          </p>
          <p className="font-bebas text-xs mt-3">₹{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default page;
