import React from "react";
import Link from "next/link";
import { Novels } from "@/type/novel.type";
type Params = {
  novel: Novels;
};
export default async function Novel({ novel }: Params) {
  
  return (
    <>
      <div className=" cursor-pointer" onClick={() => window.location.href = `/novel/${novel.title}`}>
        <div className="flex items-center ">
          <span className="bg-third w-2 h-[4.9rem] relative left-[0.4rem] -z-20 rounded-md"></span>
          <div className="px-4 py-2 rounded-md items-center  z-10 bg-secondary w-full space-y-[15px]">
            <p className="text-md lg:text-xl font-medium text-white text-center">
              {novel.title}
            </p>
            <div>
              {novel.description ? (
                 <p className="text-white line-clamp-2 text-sm">{novel.description}</p>
              ) : (
                <p className="text-white line-clamp-2 text-sm text-center">没有简介</p>
              )}
             
            </div>
            <div className="flex justify-between items-center mt-3">
              {novel.category && (
                <div className="bg-orange-400 px-[12px] rounded-xl py-[2px]">
                  <p className="text-[12px]">{novel.category.title}</p>
                </div>
              )}

              <p className="text-[12px] text-primary dark:text-primary ">
                {novel.episodes.length} 剧集
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
