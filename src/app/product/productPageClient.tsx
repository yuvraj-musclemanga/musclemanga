"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Catalogue_mini from "../../components/catalogue_mini/page";
import TrackableImage from "../../components/trackable_image/page";
import SizeChart from "../../../public/SizeChart.webp";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  selectTotal,
  setCartItems,
  setCartTotal,
} from "@/redux/slices/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { getProduct } from "@/data/functions";
import Loading from "../../components/loading_animation/page";
import Product from "@/data/datatypes";
// import { auth } from "../../../firebase.config";
// import toast from "react-hot-toast";

const ProductPageClient = () => {
  const dispatch = useDispatch();
  let cartItems = useSelector(selectItems);
  let cartTotal = useSelector(selectTotal);
  const searchParams = useSearchParams();
  const productId: string = searchParams.get("product") || "";
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPage = (pageIndex: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: window.innerWidth * pageIndex,
        behavior: "smooth",
      });
    }
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [activeColour, setActiveColour] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<object>();
  const [productData, setProductData] = useState<Product>({
    id: "string",
    name: "string",
    sizes: [],
    thumbnail: "string",
    pictures: { A: [] },
    colours: [],
    price: 9,
    mrp: 9,
    orderedBy: 9,
    category: "string",
    style: "string",
    collection: "string",
  });
  const [loadingFlag, setLoadingFlag] = useState(true);

  const addToCart = async () => {
    cartItems = {
      ...cartItems,
      [`${productId}-${productData.colours[activeColour]}-${productData.sizes[activeSize]}`]:
        {
          name: productData.name,
          size: productData.sizes[activeSize],
          quantity: quantity,
          picture: productData.thumbnail,
          price: productData.price,
        },
    };
    setCart(cartItems);
    dispatch(setCartItems(cartItems));
    cartTotal = cartTotal + quantity * productData.price;
    dispatch(setCartTotal(cartTotal));
  };

  // const addToWishlist = async () => {
  //   auth.currentUser
  //     ? console.log("Added")
  //     : toast.error("You need to login first!", { duration: 1500 });
  // };

  useEffect(() => {
    getProduct(productId).then((data) => {
      setProductData(data[0]);
      setLoadingFlag(false);
    });
  }, [productId]);

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("total", cartTotal.toString());
    }
  }, [cart, cartTotal]);

  return loadingFlag ? (
    <div className="w-screen h-[70vh]">
      <Loading />
    </div>
  ) : (
    <div className="w-full flex flex-col gap-4">
      <div className="w-screen flex flex-col lg:flex-row gap-4 lg:gap-0">
        <div className="w-full lg:w-3/5 flex flex-col sm:flex-row-reverse gap-4 px-0 sm:px-4">
          <div
            ref={containerRef}
            className="relative w-full h-fit aspect-[4/5] bg-gray-200 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory"
          >
            {productData.pictures[productData.colours[activeColour]].map(
              (image: string, index: number) => (
                <TrackableImage
                  src={image}
                  key={index}
                  index={index}
                  onVisible={(index) => {
                    setActiveImageIndex(index);
                  }}
                />
              )
            )}
          </div>
          <div className="w-full sm:w-fit flex flex-row sm:flex-col gap-2 items-center justify-around sm:justify-center lg:justify-start">
            <MdKeyboardArrowLeft
              className="w-8 h-8 cursor-pointer sm:rotate-90"
              onClick={() => {
                if (activeImageIndex === 0) {
                  setActiveImageIndex(
                    productData.pictures[productData.colours[activeColour]]
                      .length - 1
                  );
                  scrollToPage(
                    productData.pictures[productData.colours[activeColour]]
                      .length - 1
                  );
                } else {
                  setActiveImageIndex(activeImageIndex - 1);
                  scrollToPage(activeImageIndex - 1);
                }
              }}
            />
            <div className="flex flex-row sm:flex-col gap-1">
              {productData.pictures[productData.colours[activeColour]].map(
                (image: string, index: number) => (
                  <div
                    className="h-[66px] sm:h-[82px] lg:h-[98px] aspect-[4/5] flex items-center justify-center bg-gray-200 relative"
                    onClick={() => {
                      setActiveImageIndex(index);
                      scrollToPage(index);
                    }}
                    key={index}
                  >
                    <Image
                      src={image}
                      alt="Small product image"
                      fill
                      className={`w-full h-full object-cover flex justify-center items-center ${
                        activeImageIndex === index
                          ? `outline outline-black`
                          : ` outline-none`
                      } cursor-pointer`}
                    />
                  </div>
                )
              )}
            </div>
            <MdKeyboardArrowRight
              className="w-8 h-8 cursor-pointer sm:rotate-90"
              onClick={() => {
                if (
                  activeImageIndex ===
                  productData.pictures[productData.colours[activeColour]]
                    .length -
                    1
                ) {
                  setActiveImageIndex(0);
                  scrollToPage(0);
                } else {
                  setActiveImageIndex(activeImageIndex + 1);
                  scrollToPage(activeImageIndex + 1);
                }
              }}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex flex-col gap-4">
          <p className="px-4 font-semibold text-2xl font-[playfair]">
            {productData.name} | Oversized Tee | Unisex
          </p>
          <p className="px-4 font-semibold text-xl mb-1 font-[playfair]">
            ₹{productData.price}
          </p>
          <div className="w-full h-12 flex gap-2 px-4">
            {productData.colours.map((colour: string, index: number) => (
              <p
                className={`h-full min-w-12 flex justify-center items-center p-2 ${
                  activeColour === index
                    ? `bg-gray-200 outline-1 outline-black`
                    : `bg-gray-100`
                } text-sm font-normal cursor-pointer rounded-2xl font-[playfair]`}
                key={index}
                onClick={() => setActiveColour(index)}
              >
                {colour}
              </p>
            ))}
          </div>
          <div className="w-full h-12 flex gap-2 px-4">
            {productData.sizes.map((size: string, index: number) => (
              <p
                className={`h-full min-w-12 flex justify-center items-center p-2 ${
                  activeSize === index
                    ? `bg-gray-200 outline-1 outline-black`
                    : `bg-gray-100`
                } text-sm font-normal cursor-pointer rounded-3xl font-[playfair]`}
                key={index}
                onClick={() => setActiveSize(index)}
              >
                {size}
              </p>
            ))}
          </div>
          <div className="w-full px-4 flex flex-col gap-2">
            <p className="font-[playfair]">Quantity</p>
            <div className="w-fit flex border-black border-1">
              <FaMinus
                className="w-10 h-10 p-3"
                onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
              />
              <p className="w-14 h-10 text-xl border-l-1 border-black border-r-1 flex justify-center items-center font-[playfair]">
                {quantity}
              </p>
              <FaPlus
                className="w-10 h-10 p-3"
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>
          </div>
          <button
            className="border-1 border-black flex items-center py-3 text-xl justify-center mx-4 gap-4 active:scale-90 transition-all font-[playfair]"
            onClick={addToCart}
          >
            <CiShoppingCart className="text-3xl" />
            Add to cart
          </button>
          <button
            className="border-1 border-black flex items-center py-3 text-xl justify-center mx-4 gap-4 active:scale-90 transition-all font-[playfair]"
            onClick={() => {}}
          >
            <CiHeart className="text-3xl" />
            Wishlist
          </button>
          <div className="w-full px-4 flex flex-col gap-2">
            <p className="font-bold text-gray-400 text-xl">Size chart</p>
            <Image src={SizeChart} alt="Size chart" />
          </div>
          <div className="w-full px-4 flex flex-col gap-2 font-[playfair]">
            <p className="font-bold text-gray-400 text-xl">
              Product Description
            </p>
            <p>
              Made from 240GSM combed cotton, this heavyweight tee combines
              streetwear aesthetics with premium comfort. The minimalist design
              is a staple for those who wear their mindset on their chest.
            </p>
            <p>
              <span className="font-bold text-gray-400 text-md">
                Oversized Fit:
              </span>{" "}
              Laid-back silhouette with drop shoulders and roomy sleeves.
            </p>
            <p>
              <span className="font-bold text-gray-400 text-md">
                Heavyweight Fabric:
              </span>{" "}
              240 GSM combed cotton for all-day durability and comfort.
            </p>
            <p>
              <span className="font-bold text-gray-400 text-md">
                Unisex Style:
              </span>{" "}
              Fits every body and every kind of bad decision-maker.
            </p>
            <p>
              <span className="font-bold text-gray-400 text-md">
                Clean Typography Print:
              </span>{" "}
              Bold, simple, and slightly unhinged—just like the best stories.
            </p>
            <p>
              <span className="font-bold text-gray-400 text-md">
                Minimalist Aesthetic:
              </span>{" "}
              Works with every fit, from streetwear to softcore rebellion.
            </p>
            <ul className="text-sm list-disc list-inside">
              <li>Unisex t-shirt</li>
              <li>Made from 100% combed cotton</li>
              <li>240 GSM bio-washed fabric</li>
              <li>
                Sustainable Inks used for Printing – water-based, toxin-free,
                and non-hazardous with a lower carbon footprint
              </li>
              <li>Side-seamed</li>
              <li>Made in India</li>
            </ul>
          </div>
        </div>
      </div>
      <Catalogue_mini
        heading="Similar styles"
        collection={productData.collection}
      />
    </div>
  );
};

export default ProductPageClient;
