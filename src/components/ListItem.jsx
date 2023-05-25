import React from "react";
import { AiOutlinePlus, AiFillPlayCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

const ListItem = ({ item }) => {
  return (
    <div
      className="text-white bg-netflix z-20 rounded w-[225px] h-[120px] inline-block px-1 overflow-hidden cursor-pointer hover:w-[325px] hover:h-[300px] hover:shadow-3xl hover:absolute hover:px-0 group/movie"
    >
      <img
        className=" rounded w-full h-full object-cover group-hover/movie:h-[140px]"
        src={item}
        alt=""
      />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-3 flex-row justify-between">
          <div className="flex gap-3">
            <AiFillPlayCircle className="hover:opacity-80" size={44} />
            <AiOutlinePlus
              className="border-2  border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white"
              size={40}
            />
          </div>
          <FiChevronDown
            className="border-2  border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white"
            size={40}
          />
        </div>
        <div className="">
          <span>1 hour 14 mins</span>
          <span>16+</span>
          <span>1999</span>
          <span>HD</span>
        </div>
        <div className="">Action Fantasy Romantic</div>
      </div>
    </div>
  );
};

export default ListItem;
