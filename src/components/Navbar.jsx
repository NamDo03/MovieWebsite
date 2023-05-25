import React, { useState } from "react";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  window.onscroll = () => {
    setScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={`flex justify-between items-center py-4 px-12 z-[100] w-full fixed transition duration-1000 ease-out ${
        scroll ? " bg-black" : ""
      }`}
    >
      <div className="flex gap-8">
        <h1 className="text-red-500 text-3xl font-bold cursor-pointer">
          NETFLIX
        </h1>
        <ul className="text-white flex gap-5 items-center justify-center font-medium">
          <li className="cursor-pointer hover:opacity-70">Home</li>
          <li className="cursor-pointer hover:opacity-70">TV Shows</li>
          <li className="cursor-pointer hover:opacity-70">Movies</li>
          <li className="cursor-pointer hover:opacity-70">New & Popular</li>
          <li className="cursor-pointer hover:opacity-70">My List</li>
        </ul>
      </div>
      <div>
        <button className="text-white pr-4 hover:opacity-70">Sign In</button>
        <button className="bg-red-600 px-6 py-3 rounded cursor-pointer text-white hover:bg-red-500">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
