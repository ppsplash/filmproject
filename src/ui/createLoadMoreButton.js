import { loadPopularMovies } from "../features/movies.js";

export const createLoadMoreButton = (page) => {
  console.log("Should create button for page" + page);
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
    loadPopularMovies(event.target.getAttribute("page"));
  });
  mainDiv.appendChild(button);
};
