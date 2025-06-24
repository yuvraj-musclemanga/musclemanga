"use client";

import { selectItems, selectTotal } from "@/redux/slices/cartSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartListItem from "../../components/cartListItem/page";
import Link from "next/link";
import { auth } from "../../../firebase.config";
import { useRouter } from "next/navigation";
import { CartItem } from "@/data/datatypes";

const Page = () => {
  const cartItems = useSelector(selectItems);
  const cartTotal = useSelector(selectTotal);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const router = useRouter();

  const checkCodeAndApplyDiscount = (code: string) => {
    if (code.toUpperCase() === "NEW10") {
      const dis = Math.ceil(cartTotal / 10);
      setDiscount(dis);
    } else {
      alert("Invalid Coupon Code!");
    }
  };

  useEffect(() => {
    if (couponCode) {
      checkCodeAndApplyDiscount(couponCode);
    }
  }, [cartTotal, couponCode, checkCodeAndApplyDiscount]);

  const startOrderProcess = () => {
    const user = auth.currentUser;
    if (user) {
      router.push(`/addresses`);
    } else {
      const params = new URLSearchParams({ nxt: "adrs" });
      router.push(`/login?${params.toString()}`);
    }
  };

  return (
    <div className="w-full min-h-[50vh] flex flex-col px-4 justify-center items-center font-[playfair]">
      {cartItems && Object.keys(cartItems).length > 0 ? (
        <div className="w-full flex flex-col pt-10">
          <p className="text-xl mb-4">Items in cart</p>
          <div className="w-full flex flex-col">
            {cartItems &&
              Object.entries(cartItems).map(([key, value]) => {
                console.log(cartItems);
                return (
                  <div className="w-full flex flex-col" key={key}>
                    <CartListItem
                      item={[key, value as CartItem]}
                      wid="!w-40"
                      hig="!h-52"
                    />
                    <hr className="my-4" />
                  </div>
                );
              })}
          </div>
          <div className="w-full flex">
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 bg-gray-100 p-3"
            />
            <button
              className="bg-black text-white active:bg-gray-600 transition-all p-3"
              onClick={() => checkCodeAndApplyDiscount(couponCode)}
            >
              Apply
            </button>
          </div>
          <div className="w-full flex flex-col mt-4">
            <div className="w-full flex justify-between">
              <p>Total</p>
              <p>₹{cartTotal}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Discounts</p>
              <p>₹{discount}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>Total payable</p>
              <p>₹{cartTotal - discount}</p>
            </div>
          </div>
          <button
            className="w-full py-3 bg-black text-white text-lg mt-4"
            onClick={startOrderProcess}
          >
            Proceed to checkout →
          </button>
        </div>
      ) : (
        <div className="w-fit h-fit flex flex-col justify-center items-center gap-4">
          <p className="text-2xl">Your cart is empty!</p>
          <Link href={"/"}>
            <button className="bg-black text-white px-3 py-2 active:scale-90 transition-all">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
