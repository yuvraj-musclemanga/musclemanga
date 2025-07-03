import Link from "next/link";
import { IoIosArrowForward, IoLogoInstagram } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const HamDrawer = ({
  hamDrawerState,
  setHamDrawerState,
}: {
  hamDrawerState: number;
  setHamDrawerState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      className={`w-screen h-dvh bg-black/20 absolute top-0 left-0 ${
        hamDrawerState === 0
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      } transition duration-500 ease-in-out z-10`}
      onClick={() => {
        document.body.classList.remove("overflow-hidden");
        setHamDrawerState(0);
      }}
    >
      <div
        className={`w-3/4 h-full bg-white absolute -left-3/4 top-0 transition duration-500 ease-in-out ${
          hamDrawerState === 0 ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full p-4 relative flex flex-row-reverse">
          <RxCross2
            className="text-3xl"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              setHamDrawerState(0);
            }}
          />
        </div>
        <div className="w-full flex flex-col">
          <Link
            href={"/catalogue"}
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              setHamDrawerState(0);
            }}
          >
            <div className="w-full p-4 border-b-1 border-black flex justify-between items-center">
              <p className="text-lg">See full catalogue</p>
              <IoIosArrowForward />
            </div>
          </Link>
          <Link
            href={"/account"}
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              setHamDrawerState(0);
            }}
          >
            <div className="w-full p-4 border-b-1 border-black flex justify-between items-center">
              <p className="text-lg">Account</p>
              <IoIosArrowForward />
            </div>
          </Link>
          <div className="w-full p-4 border-b-1 border-black flex justify-between items-center">
            <p className="text-lg">Contact us</p>
            <IoIosArrowForward />
          </div>
          <div className="w-full p-4 flex justify-center items-center gap-2">
            <p className="text-lg">Follow us on</p>
            <IoLogoInstagram className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamDrawer;
