'use client'
import React from "react";
import Image from "next/image";
import scroll from "@/public/img/scroll.png";
import { Novels } from "@/type/novel.type";
import Marquee from "react-fast-marquee";
import { GiEvilEyes } from "react-icons/gi";
type Props = {
  novel: Novels;
  title: string;
};
export default function Scroll({ novel, title }: Props) {
  const sortedEpisodes = [...novel.episodes].sort((a, b) => a.id - b.id);
  return (
    <>
      {sortedEpisodes.map((episode) => (
        <div onClick={() => window.location.href = `/novel/${title}/${episode.title}`} className="cursor-pointer" key={episode.id}  >
          <div className="relative">
            <div className="relative h-[90px] md:h-[150px] lg:h-36 aspect-[6.8/4] md:aspect-video">
              <Image src={scroll} alt="ancient-scroll" fill />
            </div>
            <div className="w-full text-center absolute-center">
              <h2 className="font-semibold text-[14px] md:text-[24px]">
                {episode.title}
              </h2>
              <div className=" px-[20px]">
                {episode.episode_name?.length > 10 ? (
                  <Marquee  speed={20}>
                  <p className="text-[11px] md:text-[18px] line-clamp-1">
                    {episode.episode_name}
                  </p>
                  </Marquee>
                       ) : (
                        <p className="text-[11px] md:text-[18px] line-clamp-1">
                    {episode.episode_name}
                  </p>
                       )}
             
              </div>
            </div>
          </div>
         
          <div className=" flex justify-center items-center gap-x-[5px]">
          <GiEvilEyes className=" text-[20px] text-amber-500"/> 
            <p className="  text-white text-[12px]">{episode.view === null ? 200 : episode.view}</p>
          </div>
          
        </div>
      ))}
    </>
  );
}
