import { fetchPopularMovies } from "../api/tmdb.js";
import { movieCard } from "../ui/movieCard.js";
import { createSetFromLocalMovieData } from "../storage/localData.js";
import { loadLocalMovieData } from "../storage/localData.js";

export const loadPopularMovies = async () => {
  try {
    const remoteData = await fetchPopularMovies();
    const localDataSet = createSetFromLocalMovieData();
    const localData = loadLocalMovieData();

    console.log(remoteData);
    remoteData.results.forEach((movie) => {
      // We add default values to the retrieved movie object data
      movie.isFavorite = false;
      movie.note = "";
      if (localDataSet.has(movie.id)) {
        // If we find the id of the movie in our local data we add the infos
        const foundObj = localData.find((el) => movie.id === el.id);
        movie.isFavorite = foundObj.isFavorite ?? false;
        movie.note = foundObj.note ?? "";
      }
      movieCard(movie);
    });
  } catch (err) {
    console.error(err);
  }
};
