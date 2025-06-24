"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsBank2 } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import { LiaCcAmex, LiaCcMastercard, LiaCcVisa } from "react-icons/lia";

const Page = () => {
  const pathname = usePathname();
  const hide = pathname.includes("signup") || pathname.includes("login");
  return (
    <div
      className={`${
        hide ? "hidden" : "flex"
      } w-full bg-gray-100 p-4 flex-col gap-6 mt-4`}
    >
      <div className="flex flex-col gap-4">
        <p className="font-bold text-md">GET TO KNOW US</p>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          Contact Us
        </Link>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          FAQ&apos;s
        </Link>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          Terms & Conditions
        </Link>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-md">SHIPPING AND RETURNS</p>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          Delivery & Shipping
        </Link>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          Exchange & Returns
        </Link>
        <Link href={"/"} className="text-gray-500 text-sm font-medium">
          Refund Policy
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-md">CUSTOMER CARE</p>
        <p className="text-gray-500 text-sm font-medium">
          Timings: 10 A.M. - 7 P.M. (Mon - Sat)
        </p>
        <p className="text-gray-500 text-sm font-medium">
          WhatsApp: +919805969277
        </p>
        <p className="text-gray-500 text-sm font-medium">
          Email: support@musclemangaclothing.in
        </p>
      </div>
      <Link href={"/"} className="flex items-center gap-2">
        Follow us on instagram <IoLogoInstagram className="text-xl" />
      </Link>
      <div className="w-full border-t-1 border-black flex flex-col items-center">
        <div className="w-full flex justify-center items-center py-3 gap-4">
          <LiaCcVisa className="text-2xl" />
          <LiaCcMastercard className="text-2xl" />
          <BsBank2 className="text-2xl" />
          <LiaCcAmex className="text-2xl" />
          <p className="flex items-center text-sm">RuPay▸</p>
          <p className="flex items-center text-sm">UPI▸</p>
        </div>
        <p className="text-gray-500 text-sm">&copy;2025, MuscleMangaClothing</p>
      </div>
    </div>
  );
};

export default Page;
