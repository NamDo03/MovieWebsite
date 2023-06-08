import React, { useState } from "react";
import avatar from "../images/avatar.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoSearch } from "react-icons/go";
import { AiFillCaretDown } from "react-icons/ai";
import { BiUser, BiHelpCircle, BiMenu } from "react-icons/bi";
import Menu from "./Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [scroll, setScroll] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const showMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleChangeInput = (e) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    if (keywords.length > 0) {
      navigate(`/search?keywords=${keywords.trim()}`);
    } else {
      navigate("/");
    }
  };

  const navigatePage = (path) => {
    navigate(`/${path}`);
    setKeywords("");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("log out");
    } catch (e) {
      console.log(e.message);
    }
  };

  window.onscroll = () => {
    setScroll(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div
      className={`select-none flex justify-between items-center py-4 px-12 tablet:px-5 z-[100] w-full fixed transition duration-1000 ease-out ${
        scroll ? " bg-black" : ""
      }`}
    >
      <div className="flex gap-8 items-center tablet:gap-4">
        <BiMenu
          onClick={showMenu}
          size={40}
          className="text-white lg:hidden"
        />
        <h1
          onClick={() => navigatePage("")}
          className="text-red-500 text-3xl font-bold cursor-pointer"
        >
          NETFLIX
        </h1>
        <ul className=" text-white hidden lg:flex gap-5 items-center justify-center font-medium">
          <li
            onClick={() => navigatePage("")}
            className="cursor-pointer hover:opacity-70"
          >
            Home
          </li>
          <li
            onClick={() => navigatePage("tvshows")}
            className="cursor-pointer hover:opacity-70"
          >
            TV Shows
          </li>
          <li
            onClick={() => navigatePage("movies")}
            className="cursor-pointer hover:opacity-70"
          >
            Movies
          </li>
          <li
            onClick={() => navigatePage("mylist")}
            className="cursor-pointer hover:opacity-70"
          >
            My List
          </li>
        </ul>

        <Menu showMenu={showMenu} isMobile={isMobile}/>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <GoSearch
            size={22}
            className="text-white cursor-pointer translate-x-8"
          />
          <input
            onChange={handleChangeInput}
            value={keywords}
            placeholder="Title"
            className="transition-all ease-in duration-300 text-white text-sm border border-solid border-white outline-none bg-black px-5 py-2 cursor-pointer opacity-0 w-0 focus:pl-10 focus:w-[250px] focus:cursor-text focus:opacity-100"
          />
        </div>
        <div className="ml-7 mr-9 relative cursor-pointer">
          <div
            onClick={() => setDropDown(!dropDown)}
            className="flex justify-center items-center gap-2"
          >
            <img
              className=" w-[35px] h-[35px] rounded cursor-pointer"
              src={avatar}
              alt=""
            />
            <AiFillCaretDown
              className={`text-white cursor-pointer transition duration-300 ${
                dropDown ? "rotate-180" : ""
              }`}
            />
          </div>
          {dropDown && (
            <div className="bg-black/75 text-white absolute right-1 top-[60px] flex flex-col min-w-[200px] shadow-3xl">
              <div className="absolute right-9 -top-6 border-solid border-[10px] border-transparent border-b-[#e5e5e5]"></div>
              <h1 className="p-5 border-b-[1px] border-white/30 text-center">
                {user && user.email}
              </h1>
              <ul className="px-5 py-3 flex flex-col gap-3">
                <li className="flex items-center gap-4 cursor-pointer hover:underline">
                  <BiUser className="text-white/75" size={24} /> Account
                </li>
                <li className="flex items-center gap-4 cursor-pointer hover:underline">
                  <BiHelpCircle className="text-white/75" size={24} /> Help
                  center
                </li>
              </ul>
              <span
                onClick={handleLogout}
                className="border-t-[1px] border-white/30 py-4 text-center cursor-pointer hover:underline"
              >
                Sign out of Netflix
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
