import { fetchSingleMovie, searchMovies } from "../api/tmdb.js";
import { movieCard } from "../ui/movieCard.js";
import { createLoadMoreButton } from "../ui/createLoadMoreButton.js";
import { createSetFromLocalMovieData } from "../storage/localData.js";
import { loadLocalMovieData } from "../storage/localData.js";

export const loadMovies = async (page, apiRequest, keyword) => {
  try {
    let remoteData;
    if (keyword) {
      remoteData = await apiRequest(keyword);
    } else {
      remoteData = await apiRequest(page);
    }
    const localDataSet = createSetFromLocalMovieData();
    const localData = loadLocalMovieData();

    console.log(remoteData);
    const loadMoreButton = document.getElementById("loadMoreButton");
    if (remoteData.total_pages > page) {
      if (loadMoreButton) loadMoreButton.remove();
      createLoadMoreButton(++page, apiRequest, keyword);
    } else {
      loadMoreButton.remove();
    }
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

export const loadFavoriteMovies = async () => {
  try {
    // First get the favorites movie data from local storage
    const data = loadLocalMovieData();
    const favoritedMovies = data.filter((el) => el.isFavorite === true);

    // Query TMDB for each favorite
    for (const favoritedMovie of favoritedMovies) {
      // Need to use for... of here as forEach is not async
      const movie = await fetchSingleMovie(favoritedMovie.id);
      movie.isFavorite = true;
      movie.note = favoritedMovie.note ?? "";
      movieCard(movie);
    }
  } catch (err) {
    console.error(err);
  }
};
