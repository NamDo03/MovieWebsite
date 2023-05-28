import React, { useEffect } from "react";
import Main from "../components/Main";
import Slider from "../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";

const Home = () => {
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  });

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  });
  return (
    <div>
      <Main movies={movies}/>
      <Slider movies={movies} />
    </div>
  );
};

export default Home;
