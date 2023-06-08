import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { openMovieDetail } from "../store/index";
import { AiOutlinePlus, AiFillPlayCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useNavigate } from "react-router-dom";

const Card = ({ movieData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { user } = UserAuth();

  const watchMovie = (movie) => {
    navigate(`/watch/${movie.type}/${movie.id}`);
  };

  const handleMovieClick = (movie) => {
    dispatch(openMovieDetail(movie));
  };

  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovie = async () => {
    if (user?.email) {
      setIsAdded(!isAdded);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: movieData.id,
          name: movieData.name,
          image: movieData.image,
          overview: movieData.overview,
          poster: movieData.poster,
          type: movieData.type,
          vote: movieData.vote,
          release: movieData.release,
          language: movieData.language,
          genres: movieData.genres,
        }),
      });
    } else {
      alert("error");
    }
  };
  const removeMovie = async () => {
    setIsAdded(false);
    await updateDoc(movieID, {
      savedMovies: arrayRemove({
        id: movieData.id,
        name: movieData.name,
        image: movieData.image,
        overview: movieData.overview,
        poster: movieData.poster,
        type: movieData.type,
        vote: movieData.vote,
        release: movieData.release,
        language: movieData.language,
        genres: movieData.genres,
      }),
    });
  };
  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (user?.email) {
        const docSnap = await getDoc(movieID);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const savedMovies = data.savedMovies;
          const isMovieSaved = savedMovies.some(
            (movie) => movie.id === movieData.id
          );
          setIsAdded(isMovieSaved);
        }
      }
    };

    fetchSavedMovies();
  }, [movieID, movieData.id, user?.email]);

  return (
    <div
      className="text-white max-w-[280px] w-[280px] h-full relative tablet:w-[220px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="rounded w-full h-full z-10 object-cover cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
        alt=""
      />
      {isHovered && (
        <div className="z-50 h-max w-80 absolute -top-[12vh] -left-5 tablet:w-72 tablet:-top-[10vh] tablet:-left-6 rounded shadow-3xl bg-netflix transition duration-300 ease-in-out">
          <div>
            <img
              className="relative h-[140px] w-full object-cover rounded top-0 z-[4]"
              src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
              alt=""
            />
          </div>
          <div className="px-4 py-1 flex flex-col gap-2">
            <h3 className="font-bold tablet:text-sm">{movieData.name}</h3>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <AiFillPlayCircle
                  onClick={() => watchMovie(movieData)}
                  className="hover:opacity-80 cursor-pointer"
                  size={44}
                />
                {isAdded ? (
                  <Tippy
                    content={
                      <div className="text-lg font-semibold px-2 tablet:text-sm">
                        Remove from My List
                      </div>
                    }
                    theme="light"
                  >
                    <button>
                      <BsCheckLg
                        onClick={removeMovie}
                        className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                        size={40}
                      />
                    </button>
                  </Tippy>
                ) : (
                  <Tippy
                    content={
                      <div className="text-lg font-semibold px-2 tablet:text-sm">
                        Add to My List
                      </div>
                    }
                    theme="light"
                  >
                    <button>
                      <AiOutlinePlus
                        onClick={saveMovie}
                        className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                        size={40}
                      />
                    </button>
                  </Tippy>
                )}
              </div>
              <div>
                <Tippy
                  content={
                    <div className="text-lg font-semibold px-2 tablet:text-sm">Info</div>
                  }
                  theme="light"
                >
                  <button>
                    <FiChevronDown
                      onClick={() => handleMovieClick(movieData)}
                      className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                      size={40}
                    />
                  </button>
                </Tippy>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-[#46D369] text-sm font-semibold tablet:text-xs">
                {Math.round(movieData.vote * 10)}% Match
              </span>
              <span className="text-[#BCBCBC] text-sm font-semibold border border-[#BCBCBC] px-2 tablet:text-xs">
                13+
              </span>
              <span className="text-[#BCBCBC] text-sm font-semibold tablet:text-xs">
                {movieData.release}
              </span>
              <span className="text-[#FFFFFFE6] text-[10px] font-semibold border border-[#FFFFFFE6] rounded px-1">
                HD
              </span>
            </div>
            <div>
              <ul className="flex flex-row gap-4 text-white list-disc">
                {movieData.genres.map((genre, index) => (
                  <li
                    className="pr-2 text-sm first-of-type:list-none font-semibold tablet:text-xs"
                    key={index}
                  >
                    {genre}
                  </li>
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
