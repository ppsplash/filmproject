import { TMDB_API_TOKEN } from "../config.js";

export const fetchPopularMovies = async () => {
  const options = { method: "GET", headers: { accept: "application/json", Authorization: "Bearer " + TMDB_API_TOKEN } };
  return fetch("https://api.themoviedb.org/3/discover/movie", options)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
};
