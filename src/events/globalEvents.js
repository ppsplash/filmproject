export const setupGlobalEvents = () => {
  searchBarToggleMobile();
};

const searchBarToggleMobile = () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBar = document.getElementById("searchBar");
  searchIcon.addEventListener("click", (event) => {
    searchBar.classList.toggle("hidden");
  });
};
