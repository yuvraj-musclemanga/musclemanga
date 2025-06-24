import { CartItem } from "@/data/datatypes";
import {
  selectItems,
  selectTotal,
  setCartItems,
  setCartTotal,
} from "@/redux/slices/cartSlice";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Page = ({
  item,
  wid,
  hig,
}: {
  item: [string, CartItem];
  wid?: string;
  hig?: string;
}) => {
  const cartItems: { [key: string]: CartItem } = useSelector(selectItems);
  const cartTotal = useSelector(selectTotal);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-fit flex gap-2">
      <Image
        src={item[1].picture}
        alt="product image"
        width={100}
        height={100}
        className={`${wid ? wid : "!w-20"} ${
          hig ? hig : "!h-28"
        } object-cover bg-gray-100`}
      />
      <div className="w-full flex flex-col justify-between overflow-x-hidden">
        <div className="w-full flex flex-col">
          <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
            {item[1].name} | Oversized Tee | Unisex
          </p>
          <p>{item[1].size}</p>
          <p>₹{item[1].price * item[1].quantity}</p>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-fit flex border-black border-1">
            <FaMinus
              className="w-6 h-6 p-2"
              onClick={() => {
                if (item[1].quantity > 1) {
                  const updatedCartItems = {
                    ...cartItems,
                    [item[0]]: {
                      ...item[1],
                      quantity: item[1].quantity - 1,
                    },
                  };
                  const updatedTotal = cartTotal - item[1].price;
                  dispatch(setCartItems(updatedCartItems));
                  dispatch(setCartTotal(updatedTotal));
                }
              }}
            />
            <p className="w-8 h-6 text-xl border-l-1 border-black border-r-1 flex justify-center items-center font-[playfair]">
              {item[1].quantity}
            </p>
            <FaPlus
              className="w-6 h-6 p-2"
              onClick={() => {
                const updatedCartItems = {
                  ...cartItems,
                  [item[0]]: {
                    ...item[1],
                    quantity: item[1].quantity + 1,
                  },
                };
                const updatedTotal = cartTotal + item[1].price;
                dispatch(setCartItems(updatedCartItems));
                dispatch(setCartTotal(updatedTotal));
              }}
            />
          </div>
          <IoTrashBin
            color="red"
            className="w-6 h-6 flex justify-center items-center active:scale-90"
            onClick={() => {
              const updatedTotal = cartTotal - item[1].price * item[1].quantity;
              const updatedCartItems = { ...cartItems };
              delete updatedCartItems[item[0]];
              dispatch(setCartItems(updatedCartItems));
              dispatch(setCartTotal(updatedTotal));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
