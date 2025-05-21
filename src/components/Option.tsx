"use client";
import cn from "@/util/util";
import { MdAdd } from "react-icons/md";
import { HiOutlineMinusSm } from "react-icons/hi";
import React, {
  useEffect,
  useRef, 
  useState,
} from "react";
import { IoOptionsOutline } from "react-icons/io5";
type Props = {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  background: String;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  fontSize: number;
  setlineHeight: React.Dispatch<React.SetStateAction<number>> | any;
  lineHeight: number | any;

};
export default function Option({
  setBackground,
  background,
  fontSize,
  setFontSize,
  setlineHeight,
  lineHeight
}: Props) {

  const [openOption, setOpenOption] = useState(false);
  const episodeOptionRef = useRef<HTMLDivElement>(null);

  const handleChangeBackground = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setBackground(event.currentTarget.name);
  };
  const changeFontSize = (increment: boolean) => {
    setFontSize((fontSize) => {
      let newFontSize = increment ? fontSize + 1 : fontSize - 1;
      return Math.max(12, Math.min(newFontSize, 20)); // Example bounds
    });
  };
  const changelineHeight = (increment2: boolean) => {
  
    setlineHeight(() => {
      let newlineHeight = increment2 ? lineHeight + 1 : lineHeight - 1;
      return Math.max(1.6, Math.min(newlineHeight, 4)); 
    });
   
  };
  const handleToggleOption = () => {
    setOpenOption((isOpen) => !isOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      episodeOptionRef.current &&
      !episodeOptionRef.current.contains(event.target as Node)
    ) {
      setOpenOption(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={episodeOptionRef}>
      <button onClick={handleToggleOption}>
        <IoOptionsOutline
          className={cn(
            "text-white hover:text-primary hover:cursor-pointer transition-all"
          )}
          size={24}
        />
      </button>
      {openOption && (
        <div className="absolute right-6 p-2 bg-slate-100  w-40 rounded-xl">
          <p className="text-lg text-center">字体</p>
          <div className="flex justify-center">
            <button
              onClick={() => changeFontSize(false)}
              aria-label="Decrease font size"
              className={`px-6 py-2 bg-slate-300  rounded-tl-lg  rounded-bl-lg  relative `}
            >
           <HiOutlineMinusSm className="active:text-amber-700 active:scale-[1.3] active:font-bold "/>
            </button>
            <button
              onClick={() => changeFontSize(true)}
              className="px-6 py-2 bg-slate-300   rounded-br-lg rounded-tr-lg relative"
            >
             <MdAdd className="active:text-amber-700 active:scale-[1.3] active:font-bold "/>
            </button>
          </div>
          <p className="text-lg text-center">行间距</p>
          <div className="flex justify-center">
            <button
              onClick={() => changelineHeight(false)}
             
              className="px-6 py-2 bg-slate-300  rounded-tl-lg  rounded-bl-lg "
            >
             <HiOutlineMinusSm className="active:text-amber-700 active:scale-[1.3] active:font-bold "/>
            </button>
            <button
              onClick={() => changelineHeight(true)}
              className="px-6 py-2 bg-slate-300   rounded-br-lg rounded-tr-lg relative"
            >
              <MdAdd className="active:text-amber-700 active:scale-[1.3] active:font-bold "/>
            </button>
          </div>
          <p className="mt-2 text-lg text-center">背景</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            <button
              onClick={handleChangeBackground}
              name="bg-white"
              className=" w-8 h-8 rounded-full bg-white active:scale-[1.2]"
            ></button>
            <button
              onClick={handleChangeBackground}
              name="bg-dark"
              className="w-8 h-8 rounded-full bg-dark active:scale-[1.2]"
            ></button>
            <button
              onClick={handleChangeBackground}
              name="bg-gray-200"
              className="w-8 h-8 rounded-full bg-gray-400 active:scale-[1.2]"
            ></button>
            <button
              onClick={handleChangeBackground}
              name="bg-[#F1E2C9]"
              className="w-8 h-8 rounded-full bg-[#F1E2C9] active:scale-[1.2]"
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}
