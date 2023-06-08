import React from "react";
import { useDispatch } from "react-redux";
import { openMovieDetail } from "../store/index";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Main = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = data[Math.floor(Math.random() * data.length)];

  const watchMovie = (movie) => {
    navigate(`/watch/${movie.type}/${movie.id}`);
  };

  const handleMovieClick = (movie) => {
    dispatch(openMovieDetail(movie));
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-[650px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[650px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.image}`}
          alt={movie?.name}
        />
        <div className="absolute w-[40%] top-[45%] p-4 tablet:w-[60%] tablet:top-[30%]">
          <h1 className="text-2xl mb-3 font-bold">{movie?.name}</h1>
          <p>{truncateString(movie?.overview, 150)}</p>
          <div className="flex gap-4 my-3">
            <button
              onClick={() => watchMovie(movie)}
              className="flex justify-center items-center gap-3 bg-white text-black py-2 px-6 text-lg font-semibold rounded hover:opacity-75"
            >
              <FaPlay size={26} />
              Play
            </button>
            <button
              onClick={() => handleMovieClick(movie)}
              className="flex justify-center items-center gap-3 bg-neutral-500 text-white py-2 px-6 text-lg font-semibold rounded bg-opacity-70 hover:bg-opacity-40"
            >
              <AiOutlineInfoCircle size={32} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
