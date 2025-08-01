import banner from "../../public/new_items_banner_1.webp";
import Image from "next/image";
import Catalogue_mini from "../components/catalogue_mini/page";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <Image src={banner} alt="banner" className="mb-6" />
      <Catalogue_mini heading="Muscle .drop-01" collection="Muscle" />
      <Catalogue_mini heading="Manga .drop-01" collection="Manga" />
    </div>
  );
}
