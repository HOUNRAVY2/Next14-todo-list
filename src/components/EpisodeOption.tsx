"use client";
import React, { useState } from "react";
import { useRouter} from 'next/navigation'
import cn from "@/util/util";
import EpisodeOptionHeader from "./EpisodeOptionHeader";
import Link from "next/link";
import { Episodes, Novels } from "@/type/novel.type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
type Props = {
  showNav:boolean;
  currentNovel: Novels | undefined;
  episodeCount: number;
  params: {
    title: string;
    episode: string;
  };
  currentEpisode: Episodes | undefined;
};
export default function EpisodeOption({
  episodeCount,
  params,
  currentNovel,
  showNav
}: Props) {
  const [slideIndex, setSlideIndex] = useState(1);
  const [episodeIsOpen, setEpisodeIsOpen] = useState(false);
  const [episodeIsOpen2, setEpisodeIsOpen2] = useState(false);
  // const episodeArray = Array.from({ length: episodeCount }, (_, i) => i + 1);
  // const chineseNumber = episodeArray.map(arabicToChinese);
  // const current = chineseToArabic(currentEpisode?.at(1)?.toString() || "");
  const handleSlideChange = (e: any) => {
    setSlideIndex(e.activeIndex);
   
  };
  const sortedEpisodes = [...(currentNovel?.episodes || [])].sort((a, b) => a.id - b.id);
  const novelTitle = sortedEpisodes[slideIndex]?.title;
  const currentEpisodeName = decodeURI(params.episode);
  const novelID = sortedEpisodes.findIndex(ep => ep.title ===  currentEpisodeName);
  const currentIndex = sortedEpisodes.findIndex(
    (ep) => ep.title === currentEpisodeName
  );
  const prev =
    currentNovel !== undefined &&
    currentIndex !== undefined &&
    currentIndex >= 1
      ? sortedEpisodes[currentIndex - 1].title
      : 0;

  const next =
    currentNovel !== undefined &&
    currentIndex !== undefined &&
    currentIndex < episodeCount - 1
      ? sortedEpisodes[currentIndex + 1]?.title
      : 0;

  const handleEpisodeOpen = () => {
    setEpisodeIsOpen((current) => !current);
  };
  const router = useRouter();
  const novelClick = () => {
    router.push(`/novel/${params.title}/${novelTitle}`);
  };
  
  return (
    <div
      className={cn(
        "w-full bg-secondary h-96 fixed -bottom-[300px] left-0 rounded-tl-xl rounded-tr-xl transition-all",
        episodeIsOpen && "-bottom-[120px]", showNav && "-bottom-[390px]"
      )}
    >
      <EpisodeOptionHeader
        handleEpisodeOpen={handleEpisodeOpen}
        prev={prev}
        next={next}
        title={decodeURI(params.title)}
        currentEpisodeName={currentEpisodeName}
      />
      <div className=" relative ">
 <Swiper direction={"vertical"}
        slidesPerView={3}
        spaceBetween={10}
        initialSlide={novelID}
        centeredSlides={true}
        mousewheel={true}
        onSlideChange={handleSlideChange}
        modules={[Mousewheel]}
        className="mySwiper"
        style={{ height: "100px" }}
        >
          {sortedEpisodes.map((number, index) => (
             <SwiperSlide key={index}>
            <span
              
              className="h-10 flex items-center justify-center snap-center hover:cursor-pointer  "
            >
              <div className=" flex justify-start">
              <Link href={`/novel/${params.title}/${number.title}`}>
                <p className={`md:text-[18px] text-[14px] ${slideIndex === index ? "text-white font-bold " : " text-white/60 opacity-40 "}`}>
                  {number.episode_name !== null
                    ? `${number.title} - ${number.episode_name}`
                    : `${number.title}`}
                </p>
              </Link>
              </div>
            </span>
          
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" flex justify-center items-center pt-[20px]">
         
          <button
      type="button" onClick={() => novelClick()}
        className="max-[320px]:text-[12px] bg-orange-400 py-2 px-4 text-black h-full rounded-md flex items-center gap-2"
      >
       确认跳转
       
      </button>
    
        </div>
        
      </div>
    </div>
  );
}
