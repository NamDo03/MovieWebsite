import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../ApiRequest";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { VscMute, VscUnmute } from "react-icons/vsc";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  console.log(movie);
  return (
    <div className="w-full h-[650px] text-white">
      <div className="w-full h-full">
        <ReactPlayer
          loop={true}
          playing={true}
          width="100%"
          height="100%"
          volume={1}
          muted={isMuted}
          url="https://vimeo.com/342154301"
        />
        {/* <img
          className="object-cover w-full h-full"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        /> */}
        <div className="absolute w-[40%] top-[45%] p-4 md:p-8">
          <h1 className="text-2xl mb-3 font-bold">{movie?.title}</h1>
          <p>{movie?.overview}</p>
          <div className="flex gap-4 my-3">
            <button className="flex justify-center items-center gap-3 bg-white text-black py-2 px-6 text-lg font-semibold rounded hover:opacity-75">
              <FaPlay size={26} />
              Play
            </button>
            <button className="flex justify-center items-center gap-3 bg-neutral-500 text-white py-2 px-6 text-lg font-semibold rounded bg-opacity-70 hover:bg-opacity-40">
              <AiOutlineInfoCircle size={32} />
              More Info
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsMuted((prev) => !prev)}
          className="absolute right-[10%] bottom-[25%] flex justify-center items-center cursor-pointer rounded-full border-white border-2 w-11 h-11 bg-transparent hover:bg-white/[.10]"
        >
          {isMuted ? <VscMute size={20} /> : <VscUnmute size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Main;
