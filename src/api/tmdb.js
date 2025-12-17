import { TMDB_API_TOKEN } from "../config.js";

export const fetchPopularMovies = async (page = 1) => {
  const options = { method: "GET", headers: { accept: "application/json", Authorization: "Bearer " + TMDB_API_TOKEN } };
  return fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};

export const fetchSingleMovie = async (movieID) => {
  const options = { method: "GET", headers: { accept: "application/json", Authorization: "Bearer " + TMDB_API_TOKEN } };
  return fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};

export const searchMovies = async (page = 1, keyword) => {
  const options = { method: "GET", headers: { accept: "application/json", Authorization: "Bearer " + TMDB_API_TOKEN } };
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&include_adult=false&language=en-US&page=${page}`, options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};
