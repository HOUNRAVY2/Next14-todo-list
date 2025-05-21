import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { CgMenuBoxed } from "react-icons/cg";
import Marquee from "react-fast-marquee";
import { useRouter} from 'next/navigation'
type Params = {
  handleEpisodeOpen: () => void;
  prev: string | number;
  next: string | number;
  title: string;
  currentEpisodeName: string ;
};
export default function EpisodeOptionHeader({
  handleEpisodeOpen,
  prev,
  next,
  title,
  currentEpisodeName
}: Params) {
  const router = useRouter();
  const preClick = () => {
    router.push(`/novel/${title}/${prev}`);
  };
  const nextClick = () => {
    router.push(`/novel/${title}/${next}`);
  };
  return (
    <div className="grid grid-cols-3 my-4 px-2 place-items-center gap-1">
      {prev !== 0 ? (
       
          <button onClick={() => preClick()} className="max-[320px]:text-sm bg-slate-900 py-2 px-4 text-gray-400 rounded-full flex items-center gap-2 ">
            <IoIosArrowBack size={14} />
            上一章
          </button>
       
      ) : (
        <div className="py-2 px-4"></div>
      )}
      <button
        onClick={handleEpisodeOpen}
        className="max-[320px]:text-[12px]  bg-orange-400 py-2 px-4 text-black h-full rounded-md flex items-center gap-2"
      >
        <CgMenuBoxed size={20} />
         {currentEpisodeName?.length  > 3 ? (
          <Marquee  speed={20}>
          {currentEpisodeName}
          </Marquee>
         ) : (
          currentEpisodeName
         )}
      </button> 
      {next !== 0 ? (
        <div onClick={() => nextClick()}>
          <button className="max-[320px]:text-sm bg-slate-900 py-2 px-4 text-gray-400 rounded-full flex items-center gap-2">
            下一章
            <IoIosArrowBack size={14} className="rotate-180" />
          </button>
        </div>
      ) : (
        <div className="py-2 px-4"></div>
      )}
    </div>
  );
}
