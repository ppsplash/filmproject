import { loadMovies } from "../features/movies.js";
import { fetchPopularMovies } from "../api/tmdb.js";

export const createLoadMoreButton = (page, apiCall, keyword) => {
  const mainDiv = document.querySelector("main");
  const button = document.createElement("div");
  button.innerHTML = `
    <div class="container">
      <div class="flex justify-center mt-8">
        <div class="button" page="${page}" id="loadMoreButton">
          Load more...
        </div>
      </div>
    </div>
  `;
  button.addEventListener("click", (event) => {
    console.log(apiCall, keyword);
    loadMovies(event.target.getAttribute("page"), apiCall, keyword);
  });
  mainDiv.appendChild(button);
};
