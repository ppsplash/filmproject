import { loadMovies } from "../features/movies.js";
import { searchMovies } from "../api/tmdb.js";

export const setupGlobalEvents = () => {
  searchBarToggleMobile();
  hittingSearchButton();
  enterOnSearchInput();
};

const searchBarToggleMobile = () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBar = document.getElementById("searchBar");
  searchIcon.addEventListener("click", (event) => {
    searchBar.classList.toggle("hidden");
  });
};

const hittingSearchButton = () => {
  const input = document.querySelector("#searchBar input");
  const button = document.querySelector("#searchBar button");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const container = document.getElementById("moviesListHook");
    container.innerHTML = "";
    const keyword = input.value.toLowerCase();
    loadMovies(1, searchMovies, keyword);
  });
};

const enterOnSearchInput = () => {
  const input = document.querySelector("#searchBar input");
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const container = document.getElementById("moviesListHook");
      container.innerHTML = "";
      const keyword = input.value.toLowerCase();
      loadMovies(1, searchMovies, keyword);
    }
  });
};
