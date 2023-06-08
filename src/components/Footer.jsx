import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="flex flex-col gap-3 px-[200px] py-7 mt-[150px] select-none tablet:mt-[70px] tablet:px-[50px]">
      <div className="text-white flex gap-7">
        <FaFacebookF size={22} className=" cursor-pointer hover:opacity-70"/>
        <BsInstagram size={22} className=" cursor-pointer hover:opacity-70"/>
        <BsTwitter size={22} className=" cursor-pointer hover:opacity-70"/>
        <BsYoutube size={22} className=" cursor-pointer hover:opacity-70"/>
      </div>
      <div className="text-[#808080] text-sm flex justify-between mt-4 tablet:flex-col">
        <ul className="flex flex-col gap-2">
          <li className=" cursor-pointer hover:text-white">Audio Description</li>
          <li className=" cursor-pointer hover:text-white">Investor Relations</li>
          <li className=" cursor-pointer hover:text-white">Legal Notices</li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className=" cursor-pointer hover:text-white">Help Center</li>
          <li className=" cursor-pointer hover:text-white">Jobs</li>
          <li className=" cursor-pointer hover:text-white">Cookie Preferences</li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className=" cursor-pointer hover:text-white">Gift Cards</li>
          <li className=" cursor-pointer hover:text-white">Terms of Use</li>
          <li className=" cursor-pointer hover:text-white">Corporate Information</li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className=" cursor-pointer hover:text-white">Media Center</li>
          <li className=" cursor-pointer hover:text-white">Privacy</li>
          <li className=" cursor-pointer hover:text-white">Contact Us</li>
        </ul>
      </div>
      <div className="text-[#808080] mt-4 mb-2">
        <button className="border border-[#808080] py-1 px-2 text-sm hover:border-white hover:text-white">Service Code</button>
      </div>
      <div className="text-[#808080]">
        <span className="text-xs">© 1997-2023 Netflix, Inc.</span>
      </div>
    </div>
  );
};

export default Footer;
