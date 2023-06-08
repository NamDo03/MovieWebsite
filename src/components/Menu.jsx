import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Menu = ({ showMenu, isMobile }) => {
  const navigate = useNavigate();
  const navigatePage = (path) => {
    showMenu();
    navigate(`${path}`)
  }
  return (
    // <div>
      <ul
        className={
          isMobile
            ? "flex-col flex items-center bg-black text-white text-2xl font-bold gap-12 p-8 absolute top-0 left-0 w-[50%] h-screen z-50"
            : "hidden"
        }
      >
        <IoCloseSharp size={40} onClick={showMenu} className="cursor-pointer" />
        <li onClick={() => navigatePage("/")} className="cursor-pointer hover:opacity-70">Home</li>
        <li onClick={() => navigatePage("/tvshows")} className="cursor-pointer hover:opacity-70">TV Shows</li>
        <li onClick={() => navigatePage("/movies")} className="cursor-pointer hover:opacity-70">Movies</li>
        <li onClick={() => navigatePage("/mylist")} className="cursor-pointer hover:opacity-70">My List</li>
      </ul>
    // </div>
  );
};
export default Menu;
