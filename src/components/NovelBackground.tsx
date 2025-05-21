import React from "react";
import Image from "next/image";
import Novel from "@/public/img/novel-bg.png";
export default function NovelBackground() {
  return (
    <Image
      alt="Mountains"
      src={Novel}
      placeholder="blur"
      quality={100}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{
        objectFit: "cover",
        backgroundRepeat: "repeat-y",
        height: "100%",
      }}
    />
  );
}
