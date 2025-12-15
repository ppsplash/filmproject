export const movieCard = (movie) => {
  const moviesListHook = document.getElementById("moviesListHook");
  const card = document.createElement("div");
  card.classList.add("relative", "group", "rounded-md");
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" class="w-full rounded-md overflow-hidden relative -top-0.5"/>
    <div class="moviesIcons -top-3 left-0 transition-all absolute ">
      <div class="movieHeart movieIconShadow cursor-pointer" data-id="${movie.id}">
        <svg width="50" height="50" class="hover:fill-red-600 group-hover:opacity-100 ${movie.isFavorite ? "fill-red-600 opacity-100" : "fill-white opacity-50"}"><use href="#bookmark"></use></svg>
      </div>
    </div>
    <div class="flex justify-center -mt-3 relative">
      <div data-id="${movie.id}" class="movieNote bg-neutral-900 text-neutral-400 text-xs py-1 px-3 -mb-2 rounded-lg text-center m-auto inline-block cursor-pointer hover:text-white ${movie.note.length > 0 ? "text-white font-bold" : ""}">
        ${movie.note.length > 0 ? "Edit note" : "+ Add note"}
      </div>
    </div>
    <div class="text-white p-2 mb-1">
      <div class="flex justify-between">
        <div class="text-neutral-600">${new Date(movie.release_date).getFullYear()}</div>
        <div class="stars">
          <svg class="star"><use href="#star"></use></svg>
          <svg class="star"><use href="#star"></use></svg>
          <svg class="star"><use href="#star"></use></svg>
          <svg class="star"><use href="#star"></use></svg>
          <svg class="star"><use href="#star"></use></svg>
        </div>
      </div>
      <div class="leading-5 font-bold min-h-10">${movie.title}</div  >
    </div>
  `;
  moviesListHook.appendChild(card);
};
