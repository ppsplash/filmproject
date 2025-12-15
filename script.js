import { TMDB_API_TOKEN } from "./config.js";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
};

const displayingFilms = (arr) => {
  const films = document.getElementById("filmlist");
  arr.forEach((obj) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h4");
    const fav = document.createElement("img");
    const text = document.createElement("p");
    img.src = `https://media.themoviedb.org/t/p/w220_and_h330_face/${obj.backdrop_path}`;
    img.alt = obj.original_title;
    title.textContent = `${obj.original_title}`;
    fav.src = "./images/Favorites.png";
    text.textContent = "Add to Favorites";
    const favItem = {
      key: obj.id,
      title: obj.original_title,
    };
    films.appendChild(card);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(fav);
    card.appendChild(text);
    fav.className = "border-radius: 50%";
    card.className = "rounded-xl shadow-lg text-black place-items-center overflow-hidden ring-1 ring-gray-200";
    img.className = "w-full object-cover";
    fav.className = "w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden";
    card.setAttribute("data-film-id", obj.id);
    fav.setAttribute("role", "button");
    text.className = "text-xs font-semibold text-red-600";
    fav.addEventListener("click", (event) => {
      let existingList = JSON.parse(localStorage.getItem("saved")) || [];
      const isItemInList = existingList.some((item) => item.key === obj.id);
      console.log(isItemInList);
      if (!isItemInList) {
        event.target.src = "./images/addedfav.png";
        text.textContent = "Added";
        existingList.push(favItem);
      } else {
        event.target.src = "./images/Favorites.png";
        text.textContent = "Add to Favorites";
        existingList = existingList.filter((item) => item.key !== obj.id);
      }
      localStorage.setItem("saved", JSON.stringify(existingList));
      console.log(existingList);
    });
  });
};

const filmWebsite = () => {
  fetch("https://api.themoviedb.org/3/movie/popular", options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const arr = res.results;
      displayingFilms(arr);
      restoreFavorites();
    })
    .catch((err) => console.error(err));
};

const restoreFavorites = () => {
  const existingList = JSON.parse(localStorage.getItem("saved")) || [];
  const inFav = "./images/addedfav.png";
  const filmCards = document.getElementById("filmlist").querySelectorAll("div[data-film-id]");
  filmCards.forEach((card) => {
    const cardId = Number(card.dataset.filmId);
    const alreadyExists = existingList.some((item) => item.key === cardId);

    if (alreadyExists) {
      const favImage = card.querySelector('img[role="button"]');
      const favText = card.querySelector("p");

      if (favImage) favImage.src = inFav;
      if (favText) favText.textContent = "Added";
    }
  });
};

window.addEventListener("load", () => {
  filmWebsite();
});
