import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { API_KEY } from "../util/constants";
import axios from "axios";

const Watch = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [movieVideo, setMovieVideo] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      )
      .then((response) => {
        console.log(response);
        const videos = response.data.results;
        let selectedVideoKey = "";
        const teaserVideo = videos.find((video) => video.type === "Teaser");
        if (teaserVideo) {
          selectedVideoKey = teaserVideo.key;
        } else {
          const trailerVideo = videos.find((video) => video.type === "Trailer");
          if (trailerVideo) {
            selectedVideoKey = trailerVideo.key;
          } else {
            const clipVideo = videos.find((video) => video.type === "Clip");
            if (clipVideo) {
              selectedVideoKey = clipVideo.key;
            }
          }
        }
        setMovieVideo(selectedVideoKey);
      })
      .catch((err) => console.log(err.message));
  }, [id, type]);

  return (
    <div className="w-[100vw] h-[100vh] relative">
      <div
        onClick={() => navigate(-1)}
        className="text-white absolute cursor-pointer top-5 left-10 flex items-center gap-3 group"
      >
        <BsArrowLeft size={50} />
        <span className="text-xl group-hover:underline">Back</span>
      </div>
      <div className="w-full h-full object-cover">
        <ReactPlayer
          playing={true}
          loop={true}
          width="100%"
          height="100%"
          volume={1}
          controls
          url={`https://www.youtube.com/watch?v=${movieVideo}`}
        />
      </div>
    </div>
  );
};

export default Watch;
