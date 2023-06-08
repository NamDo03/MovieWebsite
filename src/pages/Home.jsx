import React, { useEffect } from "react";
import Main from "../components/Main";
import Slider from "../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import MovieDetail from "../components/MovieDetail";
import TopRated from "../components/TopRated";
import { svgList } from "../images/svgList";

const Home = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded, dispatch, genres]);

  const sortMoviesByRate = (movies) => {
    return movies.sort((a, b) => b.vote - a.vote);
  };

  return (
    <div>
      <Main data={movies} />
      <TopRated
        movieData={sortMoviesByRate(
          movies.filter((movie) => movie.type === "movie")
        ).slice(0, 10)}
        title="Top 10 Movies in your Country today"
        svgList={svgList}
      />
      <TopRated
        movieData={sortMoviesByRate(
          movies.filter((movie) => movie.type === "tv")
        ).slice(0, 10)}
        title="Top 10 TV Shows in your Country today"
        svgList={svgList}
      />

      <Slider movies={movies} />
      <MovieDetail />
    </div>
  );
};

export default Home;
