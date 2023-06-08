import React from "react";
import img from "../images/pageNotFound.png";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="text-white w-full h-screen bg-fixed bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center gap-10 select-none"
        style={{ backgroundImage: `url(${img})` }}
      >
        <h1 className="text-8xl font-bold drop-shadow-xl shadow-black">
          Lost your way?
        </h1>
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="text-3xl drop-shadow-xl shadow-black">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black text-xl font-bold rounded py-3 px-5 hover:bg-white/75"
          >
            Netflix Home
          </button>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
