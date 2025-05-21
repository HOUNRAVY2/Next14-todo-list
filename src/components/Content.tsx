"use client";
import { Episodes, Novels } from "@/type/novel.type";
import React, {  useEffect, useState } from "react";
import EpisodeOption from "./EpisodeOption";
import Option from "./Option";
import cn from "@/util/util";
import { RichTextMarkdown } from "@/util/format";

type Props = {
  currentEpisode: Episodes | undefined;
  episodeCount: number[] | undefined;
  params: {
    episode: string;
    title: string;
  };
  currentNovel: Novels | undefined;
};
export default function Content({
  currentEpisode,
  episodeCount,
  params,
  currentNovel,
}: Props) {
  const [showNav, setShowNav] = useState(false);
  const [background, setBackground] = useState(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedBackground = sessionStorage.getItem("backgroundColor");
      return storedBackground || "bg-dark"; // Use stored value or default to "bg-dark"
    }
    return "bg-dark";
  });

  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedFontSize = sessionStorage.getItem("fontSize");
      return storedFontSize ? parseInt(storedFontSize, 10) : 14;
    }
    return 14;
  });

  const [lineHeight, setlineHeight] = useState(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedlineHeight = sessionStorage.getItem("lineHeight");
      return storedlineHeight || 1.8;
    }
    return 1.8;
  });

  
  // Update local storage whenever the background color changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("backgroundColor", background);
    }
  }, [background]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("fontSize", fontSize.toString());
    }
  }, [fontSize]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("lineHeight", lineHeight.toString());
    }
  }, [lineHeight]);
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const shouldHideNav = window.scrollY > 100 && window.scrollY < maxScroll;
      setShowNav(shouldHideNav);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <main className={cn("min-h-screen bg-dark transition-all", background)}>
       <div className={cn(" fixed left-1/2 transform -translate-x-1/2  bg-secondary py-[10px] px-[10px]  w-full md:max-w-[768px] top-0", showNav && " -top-[50px]")}>
           <div className="flex justify-between items-center ">
              <h1
                className={cn(
                  "text-white transition-all font-bold" 
                )}
              >
                {currentEpisode?.title} {currentEpisode?.episode_name}
              </h1>
              <Option
                setBackground={setBackground}
                background={background}
                setFontSize={setFontSize}
                fontSize={fontSize}
                lineHeight={lineHeight}
                setlineHeight={setlineHeight}
              />
            </div>
           </div>
      <div className="pt-3 w-[90%] xl:w-[40%] m-auto " onClick={()=>setShowNav(false)}>
        {currentEpisode !== undefined ? (
          <>
          
            <div
              className={cn(
                `text-white mt-4 pt-[30px]  pb-[100px] transition-all `,
                background === "bg-dark" ? "text-white" : "text-black"
              )}
              style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight}}
            > 
            <RichTextMarkdown content={currentEpisode.content}/>
             
            </div>
          </>
        ) : (
          <div className="min-h-screen flex justify-center items-center">
            <p className="text-white text-2xl">剧集不存在</p>
          </div>
        )}
      </div>

      <EpisodeOption
        episodeCount={Number(episodeCount)}
        params={params}
        currentEpisode={currentEpisode}
        currentNovel={currentNovel}
        showNav={showNav}
      />
    </main>
  );
}
