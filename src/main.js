import { loadPopularMovies } from "./features/movies.js";
import { setupMovieEvents } from "./events/movieEvents.js";

loadPopularMovies(1); // 1 for page 1
setupMovieEvents();
