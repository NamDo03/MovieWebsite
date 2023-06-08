import React, { useRef, useState } from "react";
import Card from "./Card";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const CardSlider = ({ data, title }) => {
  const [showControl, setShowControl] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distanceRight = listRef.current.getBoundingClientRect().x - 70;
    let distanceLeft = listRef.current.getBoundingClientRect().x - 26;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${280 + distanceLeft}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 5) {
      listRef.current.style.transform = `translateX(${-280 + distanceRight}px)`;
      setSliderPosition(sliderPosition + 1);
    }
    console.log(sliderPosition)
  };

  return (
    <div
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
      className="text-white flex flex-col gap-5 relative py-11 select-none overflow-x-hidden scrollbar-hiden" 
    >
      <h1 className="ml-12 text-2xl font-bold">{title}</h1>
      <div className="">
        <div
          className={`${
            !showControl ? "hidden" : "flex"
          } justify-center items-center absolute z-[99] h-[60%] bottom-[23px] w-[50px] transition duration-300 ease-in-out cursor-pointer left-0 text-white group/btn`}
        >
          <MdArrowBackIosNew
            className="bg-zinc-900/30 rounded w-full h-full group-hover/btn:bg-zinc-900/70 group-hover/btn:scale-110"
            size={30}
            onClick={() => handleDirection("left")}
          />
        </div>
        <div
          className="flex w-max gap-4 translate-x-0 transition duration-300 ease-in-out ml-12 tablet:gap-2"
          ref={listRef}
        >
          {data.map((movie, index) => {
            return <Card movieData={movie} id={movie.id} key={index} />;
          })}
        </div>
        <div
          className={`${
            !showControl ? "hidden" : "flex"
          } justify-center items-center absolute z-[99] h-[60%] bottom-[23px] w-[50px] transition duration-300 ease-in-out cursor-pointer right-0 text-white group/btn`}
        >
          <MdArrowForwardIos
            className=" bg-zinc-900/30 rounded w-full h-full group-hover/btn:bg-zinc-900/70 group-hover/btn:scale-110"
            size={30}
            onClick={() => handleDirection("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
