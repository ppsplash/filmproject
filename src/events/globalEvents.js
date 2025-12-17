import { loadMovies } from "../features/movies.js";
import { searchMovies } from "../api/tmdb.js";

export const setupGlobalEvents = () => {
  searchBarToggleMobile();
  hittingSearchButton();
};

const searchBarToggleMobile = () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBar = document.getElementById("searchBar");
  searchIcon.addEventListener("click", (event) => {
    searchBar.classList.toggle("hidden");
  });
};

const hittingSearchButton = () => {
  let input = document.querySelector("#searchBar input");
  let button = document.querySelector("#searchBar button");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    let container = document.getElementById("moviesListHook");
    container.innerHTML = "";
    let keyword = input.value.toLowerCase();
    loadMovies(1, searchMovies, keyword);
  });
};
