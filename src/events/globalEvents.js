import { searchMovies } from "../api/tmdb.js";

export const setupGlobalEvents = () => {
  searchBarToggleMobile();
};

const searchBarToggleMobile = () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBar = document.getElementById("searchBar");
  searchIcon.addEventListener("click", (event) => {
    searchBar.classList.toggle("hidden");
  });
};

let input = document.querySelector("#searchBar input");

let button = document.querySelector("#searchBar button");
button.addEventListener("click", (event) => {
  event.preventDefault();
  let keyword = input.value;
  console.log(keyword);
  searchMovies(keyword);
});
