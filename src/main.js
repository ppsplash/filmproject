import { loadMovies } from "./features/movies.js";
import { setupMovieEvents } from "./events/movieEvents.js";
import { setupGlobalEvents } from "./events/globalEvents.js";
import { fetchPopularMovies } from "./api/tmdb.js";

loadMovies(1, fetchPopularMovies); // 1 for page 1
setupMovieEvents();
setupGlobalEvents();
