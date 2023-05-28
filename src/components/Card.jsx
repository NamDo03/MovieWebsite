import React, { useState } from "react";
import { AiOutlinePlus, AiFillPlayCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

const Card = ({ movieData }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="text-white max-w-[230px] w-[230px] h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="rounded w-full h-full z-10 object-cover cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
        alt=""
      />
      {isHovered && (
        <div className="z-50 h-max w-80 absolute -top-[12vh] -left-5 rounded shadow-3xl bg-netflix transition duration-300 ease-in-out">
          <div>
            <img
              className="relative h-[140px] w-full object-cover rounded top-0 z-[4]"
              src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
              alt=""
            />
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <AiFillPlayCircle className="hover:opacity-80 cursor-pointer" size={44} />
                <AiOutlinePlus
                  className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                  size={40}
                />
              </div>
              <div>
                <FiChevronDown
                  className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                  size={40}
                />
              </div>
            </div>
            <div>
              <ul className="flex flex-row gap-4 text-white list-disc">
                {movieData.genres.map((genre,index) => (
                  <li className="pr-2 text-sm first-of-type:list-none" key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
