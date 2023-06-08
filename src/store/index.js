import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL } from "../util/constants";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
    isMovieDetailOpen: false,
    selectedMovie: null,
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {
        data: { genres },
    } = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    );
    return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                overview: movie.overview,
                poster: movie.poster_path,
                type: movie.media_type,
                vote: movie.vote_average,
                language: movie.original_language,
                release: movie.release_date ? movie.release_date : movie.first_air_date,
                genres: movieGenres.slice(0, 3),
            });
    });
};

const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre",
    async ({ genre, type }, thunkAPI) => {
        const {
            netflix: { genres },
        } = thunkAPI.getState();
        return getRawData(
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}&language=en-US&append_to_response=videos`,
            genres
        );
    }
);

export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
        const {
            netflix: { genres },
        } = thunkAPI.getState();
        return getRawData(
            `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
            genres,
            true
        );
    }
);

export const getSearchMovie = createAsyncThunk(
    "netflix/search",
    async (query) => {
        const response = await axios.get(
            `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        return response.data.results;
    }
);

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    reducers: {
        openMovieDetail: (state, action) => {
            state.isMovieDetailOpen = true;
            state.selectedMovie = action.payload;
        },
        closeMovieDetail: (state) => {
            state.isMovieDetailOpen = false;
            state.selectedMovie = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getSearchMovie.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});

export const { openMovieDetail, closeMovieDetail } = NetflixSlice.actions;
