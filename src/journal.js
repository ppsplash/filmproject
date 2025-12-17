import { loadFavoriteMovies } from "./features/movies.js";
import { setupMovieEvents } from "./events/movieEvents.js";
import { setupGlobalEvents } from "./events/globalEvents.js";

loadFavoriteMovies();
setupMovieEvents();
setupGlobalEvents();
