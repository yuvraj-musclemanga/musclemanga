"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/logo_w_bg.webp";
import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamDrawer from "../hamburger_drawer/page";
import CartDrawer from "../cart_drawer/page";

const Page = () => {
  const pathname = usePathname();
  const hide = pathname.includes("signup") || pathname.includes("login");

  const [hamDrawerState, setHamDrawerState] = useState(0);
  const [cartDrawerState, setCartDrawerState] = useState(0);

  return (
    <div
      className={`${
        hide ? "hidden" : "flex"
      } w-full flex-row sticky top-0 px-4 bg-white font-[playfair]`}
    >
      <HamDrawer
        hamDrawerState={hamDrawerState}
        setHamDrawerState={setHamDrawerState}
      />
      <div className="flex-1/3 flex items-center justify-start">
        <CiMenuBurger
          className="text-2xl active:scale-90 transition-all"
          onClick={() => {
            document.body.classList.add("overflow-hidden");
            setHamDrawerState(1);
          }}
        />
      </div>
      <div className="flex-1/3 flex justify-center items-center">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            className="w-sm active:scale-90 transition-all"
            priority
          />
        </Link>
      </div>
      <CartDrawer
        cartDrawerState={cartDrawerState}
        setCartDrawerState={setCartDrawerState}
      />
      <div className="flex-1/3 flex justify-end items-center">
        <CiShoppingCart
          className="text-2xl active:scale-90 transition-all"
          onClick={() => {
            document.body.classList.add("overflow-hidden");
            setCartDrawerState(1);
          }}
        />
      </div>
    </div>
  );
};

export default Page;
