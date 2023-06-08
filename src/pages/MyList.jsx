import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlinePlus, AiFillPlayCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import MovieDetail from "../components/MovieDetail";
import { openMovieDetail } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const [movies, setMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const watchMovie = (movie) => {
    navigate(`/watch/${movie.type}/${movie.id}`);
  };

  const handleMovieClick = (movie) => {
    dispatch(openMovieDetail(movie));
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (passedID) => {
    setIsAdded(passedID);
    setTimeout(async () => {
      try {
        const result = movies.filter((item) => item.id !== passedID);
        await updateDoc(movieRef, {
          savedMovies: result,
        });
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    }, 500);
  };

  return (
    <>
      <div className="w-full pt-20 h-[100vh]">
        <h1 className="text-white text-[34px] font-medium px-10">My List</h1>
        {movies.length === 0 ? (
          <div className="text-white text-2xl px-10 py-10 text-center">
            You haven't added any titles to your list yet.
          </div>
        ) : (
          <div className="flex gap-x-2 gap-y-12 py-8 px-10 flex-wrap">
            {movies.map((item) => (
              <div
                key={item.id}
                className="text-white max-w-[280px] w-[280px] h-full relative"
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img
                  className="rounded w-full h-full z-10 object-cover cursor-pointer"
                  src={`https://image.tmdb.org/t/p/w500/${item?.image}`}
                  alt=""
                />
                {isHovered === item.id && (
                  <div className="z-50 h-max w-80 absolute -top-[9vh] -left-5 rounded shadow-3xl bg-netflix transition duration-300 ease-in-out">
                    <div>
                      <img
                        className="relative h-[180px] w-full object-cover rounded top-0 z-[4]"
                        src={`https://image.tmdb.org/t/p/w500/${item?.image}`}
                        alt={item?.title}
                      />
                    </div>
                    <div className="px-4 py-1 flex flex-col gap-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <AiFillPlayCircle
                            onClick={() => watchMovie(item)}
                            className="hover:opacity-80 cursor-pointer"
                            size={44}
                          />
                          {isAdded === item.id ? (
                            <AiOutlinePlus
                              className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                              size={40}
                            />
                          ) : (
                            <Tippy
                              content={
                                <div className="text-lg font-semibold px-2">
                                  Remove to My List
                                </div>
                              }
                              theme="light"
                            >
                              <button>
                                <BsCheckLg
                                  onClick={() => deleteMovie(item.id)}
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
                              <div className="text-lg font-semibold px-2">
                                Info
                              </div>
                            }
                            theme="light"
                          >
                            <button>
                              <FiChevronDown
                                onClick={() => handleMovieClick(item)}
                                className="border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                                size={40}
                              />
                            </button>
                          </Tippy>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="text-[#46D369] text-sm font-semibold">
                          {Math.round(item.vote * 10)}% Match
                        </span>
                        <span className="text-[#BCBCBC] text-sm font-semibold border border-[#BCBCBC] px-2">
                          13+
                        </span>
                        <span className="text-[#BCBCBC] text-sm font-semibold">
                          {item.release}
                        </span>
                        <span className="text-[#FFFFFFE6] text-[10px] font-semibold border border-[#FFFFFFE6] rounded px-1">
                          HD
                        </span>
                      </div>
                      <div>
                        <ul className="flex flex-row gap-4 text-white list-disc">
                          {item?.genres.map((genre, index) => (
                            <li
                              className="pr-2 text-sm first-of-type:list-none"
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
            ))}
          </div>
        )}
      </div>
      <MovieDetail />
    </>
  );
};

export default MyList;
