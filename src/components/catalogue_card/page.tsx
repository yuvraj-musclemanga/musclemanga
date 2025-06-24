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
        <Image
          src={card_image}
          alt="card image"
          // fill
          width={100}
          height={100}
          className="!w-auto h-full object-cover aspect-[1/1.2] overflow-visible py-4 bg-gray-200"
        />
        <div className="flex flex-col items-center">
          <p className="font-normal text-md text-center">
            {name} | Oversized Tee | Unisex
          </p>
          <p className="text-xs mt-3">₹{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default page;
