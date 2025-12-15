import { setupMovieEvents } from "./events/movieEvents.js";
import { loadPopularMovies } from "./features/movies.js";

document.getElementById("journalLink").addEventListener("click", (event) => {
  event.preventDefault();
  const data = loadLocalMovieData();
  const favoritesIds = data.filter((el) => el.isFavorite === true).map((el) => el.id);
  console.log(favoritesIds);
});

loadPopularMovies();
setupMovieEvents();
