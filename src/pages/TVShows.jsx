import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Main from "../components/Main";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";
import MovieDetail from "../components/MovieDetail";

const TVShows = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded, dispatch, genres]);

  return (
    <div>
      <SelectGenre genres={genres} type="tv" typeTitle="TVShows" />
      {movies.length ? (
        <>
          <Main data={movies} />
          <Slider movies={movies} />
        </>
      ) : (
        <div className="h-screen">
          <h1 className="text-white text-center text-3xl font-semibold pt-[250px]">
            There are no TV shows for the selected genre
          </h1>
        </div>
      )}
      <MovieDetail />
    </div>
  );
};

export default TVShows;
