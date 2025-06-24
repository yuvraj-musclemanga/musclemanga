import { useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef } from "react";

const Page = ({
  src,
  index,
  onVisible,
}: {
  src: StaticImageData | string;
  index: number;
  onVisible: (index: number) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px -50% 0px -50%" });

  useEffect(() => {
    if (isInView) {
      onVisible(index);
    }
  }, [isInView]);
  return (
    <Image
      src={src}
      alt="product image"
      className="snap-start !min-w-full !h-full"
      ref={ref}
      width={1000}
      height={1000}
    />
  );
};

export default Page;
