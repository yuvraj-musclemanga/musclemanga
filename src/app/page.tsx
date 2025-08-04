import banner from "../../public/new_items_banner_1.webp";
import Image from "next/image";
import NextVideo from "next-video";
import Catalogue_mini from "../components/catalogue_mini/page";
import Marquee from "react-fast-marquee";
import Banner from "../../videos/Banner.mp4";

export default function Home() {
  return (
    <>
      <div className="w-full h-fit">
        <Marquee speed={60}>
          <div className="flex bg-amber-100 py-2">
            <p>🎊 Flat 10% OFF On First Order. 🎊</p>
            <p className="mx-12">🤩Use Code NEW10.🤩</p>
          </div>
        </Marquee>
      </div>
      <div className="w-full h-full flex flex-col gap-5">
        <NextVideo
          src={Banner}
          autoPlay
          loop
          controls={false}
          muted
          playsInline
        />
        <Catalogue_mini heading="Muscle .drop-01" collection="Muscle" />
        <Image src={banner} alt="banner" className="mb-6" />
        <Catalogue_mini heading="Manga .drop-01" collection="Manga" />
      </div>
    </>
  );
}
