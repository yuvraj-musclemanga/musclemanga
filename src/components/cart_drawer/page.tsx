import {
  selectItems,
  selectTotal,
  setCartItems,
  setCartTotal,
} from "@/redux/slices/cartSlice";
import { useEffect, useRef } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import CartListItem from "../../components/cartListItem/page";
import Link from "next/link";
import { CartItem } from "@/data/datatypes";

const CartDrawer = ({
  cartDrawerState,
  setCartDrawerState,
}: {
  cartDrawerState: number;
  setCartDrawerState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const cartItems = useSelector(selectItems);
  const cartTotal = useSelector(selectTotal);
  const dispatch = useDispatch();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      const items = localStorage.getItem("cart");
      const total = localStorage.getItem("total");
      if (items !== null && total !== null) {
        dispatch(setCartItems(JSON.parse(items)));
        dispatch(setCartTotal(parseInt(total)));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("total", cartTotal.toString());
    }
  }, [cartItems, cartTotal]);

  return (
    <div
      className={`w-screen h-dvh bg-black/20 absolute ${
        cartDrawerState === 0 ? "hidden -right-full" : "right-0"
      } transition-all overflow-x-hidden z-10`}
      onClick={() => {
        document.body.classList.remove("overflow-hidden");
        setCartDrawerState(0);
      }}
    >
      <div
        className="w-3/4 h-full absolute right-0 bg-white flex flex-col overflow-x-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full p-4">
          <RxCross2
            className="text-3xl"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              setCartDrawerState(0);
            }}
          />
        </div>
        <div className="w-full flex-1 overflow-x-hidden">
          {cartItems && Object.keys(cartItems).length > 0 ? (
            <div className="w-full h-full flex flex-col px-4 overflow-x-hidden">
              <div className="w-full flex-1 flex flex-col gap-4">
                {Object.entries(cartItems).map(([key, value]) => (
                  <CartListItem item={[key, value as CartItem]} key={key} />
                ))}
              </div>
              <div className="w-full flex flex-col">
                <div className="w-full flex justify-between">
                  <p>Total</p>
                  <p>₹{cartTotal}</p>
                </div>
                <Link href={"/cart"}>
                  <button
                    className="w-full flex justify-center py-3 text-white bg-black my-4 active:scale-90 transition-all"
                    onClick={() => {
                      document.body.classList.remove("overflow-hidden");
                      setCartDrawerState(0);
                    }}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center pt-12">
              <CiShoppingCart className="text-7xl" />
              <p className="text-xl">Your cart is empty!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
