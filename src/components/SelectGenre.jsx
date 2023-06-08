import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type, typeTitle }) => {
  const dispatch = useDispatch();
  const [scrollGenres, setScrollGenres] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollGenres(window.pageYOffset > 68);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex gap-10 items-center fixed z-50 w-full top-[68px] py-3 px-12 transition duration-1000 ease-out ${
        scrollGenres ? " bg-black shadow-3xl" : " "
      }`}
    >
      <h1 className="text-white text-4xl font-bold">{typeTitle}</h1>
      <div className="">
        <select
          className="cursor-pointer bg-black text-white border-white border py-1 px-3 hover:bg-white/10"
          onChange={(e) => {
            dispatch(
              fetchDataByGenre({
                genres,
                genre: e.target.value,
                type,
              })
            );
          }}
        >
          {genres.map((genre) => {
            return (
              <option className="bg-black" value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectGenre;
