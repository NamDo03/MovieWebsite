import React, { useEffect } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchMovie, getGenres } from "../store";
import MovieDetail from "../components/MovieDetail";

const useQuerry = () => new URLSearchParams(useLocation().search);
const Search = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  const keywords = useQuerry().get("keywords");

  useEffect(() => {
    dispatch(getGenres());
    if (keywords) {
      dispatch(getSearchMovie(keywords));
    }
  }, [dispatch, keywords]);

  const getGenreNames = (genreIds) => {
    if (genres && genres.length > 0 && genreIds && genreIds.length > 0) {
      const selectedGenres = genreIds.slice(0, 3);
      return selectedGenres.map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : "";
      });
    }
    return [];
  };
  const filteredMovies = movies.filter((movie) => movie.backdrop_path);
  // console.log(filteredMovies);
  return (
    <div className="h-full pt-32 px-7">
      {filteredMovies && filteredMovies.length === 0 ? (
        <div className="text-white text-3xl px-10 text-center">
          {`Your search for "${keywords}" did not have any matches`}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-16 justify-center">
          {filteredMovies.map((movie) => (
            <Card
              movieData={{
                id: movie.id,
                name: movie.title,
                image: movie.backdrop_path,
                overview: movie.overview,
                poster: movie.poster_path,
                type: movie.media_type,
                vote: movie.vote_average,
                release: movie.release_date,
                language: movie.original_language,
                genres: getGenreNames(movie.genre_ids),
              }}
              key={movie.id}
            />
          ))}
        </div>
      )}
      <MovieDetail />
    </div>
  );
};

export default Search;
