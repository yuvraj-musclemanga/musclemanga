import Image from "next/image";
import React from "react";
import { FaPowerOff } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col items-center gap-5 p-10">
        <div className="w-1/2 aspect-square rounded-full overflow-hidden">
          <Image
            src={
              "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg?w=768"
            }
            alt=""
            width={100}
            height={100}
            className="!w-full !h-full object-contain"
          />
        </div>
        <p className="text-2xl font-semibold">ysingh972</p>
        <div className="flex flex-col text-gray-500 text-sm items-center">
          <p>+919805969277</p>
          <p>ysingh972@gmail.com</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8">
        <div className="flex justify-between items-center text-2xl font-medium p-4 ml-4 mr-4 rounded-2xl bg-gray-200 shadow-xl active:scale-95 transition-all">
          <p>Addressbook</p>
          <MdOutlineKeyboardArrowRight />
        </div>
        <div className="flex justify-between items-center text-2xl font-medium p-4 ml-4 mr-4 rounded-2xl bg-gray-200 shadow-xl active:scale-95 transition-all">
          <p>Orders</p>
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-14 mb-8 gap-2">
        <FaPowerOff className="text-4xl text-red-500" />
        <p className="text-sm text-gray-400">Logout</p>
      </div>
    </div>
  );
};

export default Page;
