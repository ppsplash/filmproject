import { loadMovies } from "../features/movies.js";

export const createLoadMoreButton = (page) => {
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
    loadMovies(event.target.getAttribute("page"));
  });
  mainDiv.appendChild(button);
};
