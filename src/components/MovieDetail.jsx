import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { API_KEY } from "../util/constants";
import { useSelector, useDispatch } from "react-redux";
import { closeMovieDetail } from "../store/index";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { VscMute, VscUnmute } from "react-icons/vsc";
import { BsCheckLg } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const isMovieDetailOpen = useSelector(
    (state) => state.netflix.isMovieDetailOpen
  );
  const selectedMovie = useSelector((state) => state.netflix.selectedMovie);
  // console.log(selectedMovie);
  const watchMovie = (movie) => {
    navigate(`/watch/${movie.type}/${movie.id}`);
  };

  const handleClose = () => {
    dispatch(closeMovieDetail());
  };

  useEffect(() => {
    if (selectedMovie) {
      axios
        .get(
          `https://api.themoviedb.org/3/${selectedMovie?.type}/${selectedMovie?.id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        )
        .then((response) => {
          // console.log(response);
          const videos = response.data.results;
          let selectedVideoKey = "";
          const teaserVideo = videos.find((video) => video.type === "Teaser");
          if (teaserVideo) {
            selectedVideoKey = teaserVideo.key;
          } else {
            const trailerVideo = videos.find(
              (video) => video.type === "Trailer"
            );
            if (trailerVideo) {
              selectedVideoKey = trailerVideo.key;
            } else {
              const clipVideo = videos.find((video) => video.type === "Clip");
              if (clipVideo) {
                selectedVideoKey = clipVideo.key;
              }
            }
          }
          setTrailer(selectedVideoKey);
        })
        .catch((err) => console.log(err.message));
    }
  }, [selectedMovie]);

  // save movie to my list
  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovie = async () => {
    if (user?.email) {
      setIsAdded(!isAdded);
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: selectedMovie.id,
          name: selectedMovie.name,
          image: selectedMovie.image,
          overview: selectedMovie.overview,
          poster: selectedMovie.poster,
          type: selectedMovie.type,
          vote: selectedMovie.vote,
          release: selectedMovie.release,
          language: selectedMovie.language,
          genres: selectedMovie.genres,
        }),
      });
    } else {
      alert("error to add movie");
    }
  };
  const removeMovie = async () => {
    if (user?.email) {
      setIsAdded(false);
      await updateDoc(movieID, {
        savedMovies: arrayRemove({
          id: selectedMovie.id,
          name: selectedMovie.name,
          image: selectedMovie.image,
          overview: selectedMovie.overview,
          poster: selectedMovie.poster,
          type: selectedMovie.type,
          vote: selectedMovie.vote,
          release: selectedMovie.release,
          language: selectedMovie.language,
          genres: selectedMovie.genres,
        }),
      });
    } else {
      alert("error to delete movie");
    }
  };
  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (user?.email && selectedMovie) {
        const docSnap = await getDoc(movieID);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const savedMovies = data.savedMovies;
          const isMovieSaved = savedMovies.some(
            (movie) => movie.id === selectedMovie.id
          );
          setIsAdded(isMovieSaved);
        }
      }
    };

    fetchSavedMovies();
  }, [movieID, selectedMovie, selectedMovie?.id, user?.email]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <>
      {isMovieDetailOpen && (
        <div className="">
          <div
            onClick={handleClose}
            className="fixed top-0 left-0 w-full h-full z-[100] bg-black/60"
          ></div>
          <div className="w-[60%] bg-[#181818] fixed top-[2%] left-[20%] z-[200] shadow-3xl rounded-3xl ">
            <button className="absolute right-5 top-3 z-30">
              <IoMdCloseCircle
                onClick={handleClose}
                className="text-white"
                size={40}
              />
            </button>
            <div className="w-full h-[450px] relative rounded-3xl mt-[18px] ">
              <ReactPlayer
                playing={true}
                loop={true}
                width="100%"
                height="100%"
                volume={1}
                muted={muted}
                url={`https://www.youtube.com/watch?v=${trailer}`}
              />

              <div className="flex justify-between items-center w-full absolute bottom-10 px-12">
                <div className="flex gap-6">
                  <button
                    onClick={() => watchMovie(selectedMovie)}
                    className="flex justify-center items-center gap-3 bg-white text-black py-2 px-6 text-lg font-semibold rounded hover:opacity-75 cursor-pointer"
                  >
                    <FaPlay size={26} />
                    Play
                  </button>
                  <button>
                    {isAdded ? (
                      <Tippy
                        content={
                          <div className="text-lg font-semibold px-2">
                            Remove from My List
                          </div>
                        }
                        theme="light"
                      >
                        <div>
                          <BsCheckLg
                            onClick={removeMovie}
                            className="text-white border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                            size={40}
                          />
                        </div>
                      </Tippy>
                    ) : (
                      <Tippy
                        content={
                          <div className="text-lg font-semibold px-2">
                            Add to My List
                          </div>
                        }
                        theme="light"
                      >
                        <div>
                          <AiOutlinePlus
                            onClick={saveMovie}
                            className="text-white border-2 border-zinc-600 bg-[#2A2A2A99] rounded-full p-2 hover:border-white cursor-pointer"
                            size={40}
                          />
                        </div>
                      </Tippy>
                    )}
                  </button>
                </div>
                <button className="text-white">
                  {muted ? (
                    <VscMute
                      className="text-white rounded-full border-2 p-2 border-zinc-600 bg-[#2A2A2A99] hover:border-white cursor-pointer"
                      size={40}
                      onClick={() => setMuted(!muted)}
                    />
                  ) : (
                    <VscUnmute
                      className="text-white rounded-full border-2 p-2 border-zinc-600 bg-[#2A2A2A99] hover:border-white cursor-pointer"
                      size={40}
                      onClick={() => setMuted(!muted)}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 px-12 pb-5 pt-4">
              <h1 className="text-white text-xl font-bold">
                {selectedMovie.name}
              </h1>
              <div className="flex gap-3 items-center">
                <span className="text-[#46D369] text-sm font-semibold">
                  {Math.round(selectedMovie.vote * 10)}% Match
                </span>
                <span className="text-[#BCBCBC] text-sm font-semibold border border-[#BCBCBC] px-2">
                  13+
                </span>
                <span className="text-[#BCBCBC] text-sm font-semibold">
                  {selectedMovie.release}
                </span>
                <span className="text-[#FFFFFFE6] text-[10px] font-semibold border border-[#FFFFFFE6] rounded px-1">
                  HD
                </span>
              </div>

              <div className="flex flex-col gap-x-10 gap-y-4">
                <p className="text-white w-5/6">
                  {truncateString(selectedMovie?.overview, 400)}
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="text-white">
                    <span className="text-[gray]">Genres: </span>
                    {selectedMovie.genres.map((genre) => genre).join(", ")}
                  </div>

                  <div className="text-white">
                    <span className="text-[gray]">Original language: </span>
                    {selectedMovie.language}
                  </div>

                  <div className="text-white">
                    <span className="text-[gray]">Total votes: </span>
                    {selectedMovie.vote}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
