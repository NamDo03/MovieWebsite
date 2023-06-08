import React, { useRef, useState, useEffect } from "react";
import { openMovieDetail } from "../store/index";
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
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { AiOutlinePlus, AiFillPlayCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useNavigate } from "react-router-dom";

const TopRated = ({ movieData, title, svgList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listRef = useRef();
  const [showControl, setShowControl] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [isAdded, setIsAdded] = useState({});
  const { user } = UserAuth();

  const watchMovie = (movie) => {
    navigate(`/watch/${movie.type}/${movie.id}`);
  };

  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovie = async (movie) => {
    console.log(movie);
    if (user?.email) {
      setIsAdded((prevState) => {
        return {
          ...prevState,
          [movie.id]: true,
        };
      });
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: movie.id,
          name: movie.name,
          image: movie.image,
          overview: movie.overview,
          poster: movie.poster,
          type: movie.type,
          vote: movie.vote,
          release: movie.release,
          language: movie.language,
          genres: movie.genres,
        }),
      });
    } else {
      alert("error");
    }
  };
  const removeMovie = async (movie) => {
    setIsAdded((prevState) => {
      return {
        ...prevState,
        [movie.id]: false,
      };
    });
    await updateDoc(movieID, {
      savedMovies: arrayRemove({
        id: movie.id,
        name: movie.name,
        image: movie.image,
        overview: movie.overview,
        poster: movie.poster,
        type: movie.type,
        vote: movie.vote,
        release: movie.release,
        language: movie.language,
        genres: movie.genres,
      }),
    });
  };

  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (user?.email) {
        const movieDoc = doc(db, "users", `${user.email}`);
        const snapshot = await getDoc(movieDoc);
        if (snapshot.exists()) {
          const savedMovies = snapshot.data().savedMovies;
          const savedMovieIds = savedMovies.map((movie) => movie.id);
          const initialIsAddedState = savedMovieIds.reduce((state, movieId) => {
            state[movieId] = true;
            return state;
          }, {});
          setIsAdded(initialIsAddedState);
        }
      }
    };

    fetchSavedMovies();
  }, [user]);

  const handleMovieClick = (movie) => {
    dispatch(openMovieDetail(movie));
  };

  const handleDirection = (direction) => {
    let distanceRight = listRef.current.getBoundingClientRect().x - 70;
    let distanceLeft = listRef.current.getBoundingClientRect().x - 26;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${280 + distanceLeft}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 5) {
      listRef.current.style.transform = `translateX(${-280 + distanceRight}px)`;
      setSliderPosition(sliderPosition + 1);
    }
    console.log(sliderPosition);
  };

  return (
    <div
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
      className="text-white flex flex-col gap-5 relative py-11 select-none overflow-x-hidden scrollbar-hide"
    >
      <h1 className="ml-12 text-2xl font-bold">{title}</h1>
      <div className="">
        <div
          className={`${
            !showControl ? "hidden" : "flex"
          } justify-center items-center absolute z-[99] h-[60%] bottom-[50px] w-[50px] cursor-pointer left-0 text-white group/btn`}
        >
          <MdArrowBackIosNew
            className="bg-zinc-900/30 rounded w-full h-full group-hover/btn:bg-zinc-900/70 group-hover/btn:scale-110"
            size={30}
            onClick={() => handleDirection("left")}
          />
        </div>
        <div className="flex w-max gap-4 translate-x-0 ml-12">
          <div className="">
            <div
              ref={listRef}
              className="flex gap-10 items-center transition duration-300 ease-in-out tablet:gap-6"
            >
              {movieData.map((movie, index) => (
                <div
                  onMouseEnter={() => setHoveredMovieId(movie.id)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                  key={index}
                  className="text-white w-fit relative flex flex-row items-center"
                >
                  <div className="max-w-[110px] w-[110px] h-full tablet:w-[80px]">
                    {svgList[index % svgList.length]}
                  </div>
                  <div className="max-w-[150px] w-[150px] h-full tablet:w-[120px]">
                    <img
                      className="rounded w-full h-full z-10 object-cover cursor-pointer "
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
                      alt={movie.name}
                    />
                    {hoveredMovieId === movie.id && (
                      <div className="z-50 h-max w-80 tablet:w-72 absolute -top-[9vh] -left-5 rounded shadow-3xl bg-netflix transition duration-300 ease-in-out">
                        <div>
                          <img
                            className="relative h-[170px] w-full object-cover rounded top-0 z-[4]"
                            src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
                            alt=""
                          />
                        </div>
                        <div className="px-4 py-1 flex flex-col gap-2">
                          <h3 className="font-bold tablet:text-sm">{movie.name}</h3>
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <AiFillPlayCircle
                                onClick={() => watchMovie(movie)}
                                className="hover:opacity-80 cursor-pointer"
                                size={44}
                              />
                              {isAdded[movie.id] ? (
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
                                      onClick={() => removeMovie(movie, index)}
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
                                      onClick={() => saveMovie(movie, index)}
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
                                  <div className="text-lg font-semibold px-2 tablet:text-sm">
                                    Info
                                  </div>
                                }
                                theme="light"
                              >
                                <button>
                                  <FiChevronDown
                                    onClick={() => handleMovieClick(movie)}
                                    className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                                    size={40}
                                  />
                                </button>
                              </Tippy>
                            </div>
                          </div>
                          <div className="flex gap-3 items-center">
                            <span className="text-[#46D369] text-sm font-semibold tablet:text-xs">
                              {Math.round(movie.vote * 10)}% Match
                            </span>
                            <span className="text-[#BCBCBC] text-sm font-semibold border border-[#BCBCBC] px-2 tablet:text-xs">
                              13+
                            </span>
                            <span className="text-[#BCBCBC] text-sm font-semibold tablet:text-xs">
                              {movie.release}
                            </span>
                            <span className="text-[#FFFFFFE6] text-[10px] font-semibold border border-[#FFFFFFE6] rounded px-1">
                              HD
                            </span>
                          </div>
                          <div>
                            <ul className="flex flex-row gap-4 text-white list-disc">
                              {movie.genres.map((genre, index) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${
            !showControl ? "hidden" : "flex"
          } justify-center items-center absolute z-[99] h-[60%] bottom-[50px] w-[50px] transition duration-300 ease-in-out cursor-pointer right-0 text-white group/btn`}
        >
          <MdArrowForwardIos
            className=" bg-zinc-900/30 rounded w-full h-full group-hover/btn:bg-zinc-900/70 group-hover/btn:scale-110"
            size={30}
            onClick={() => handleDirection("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default TopRated;
