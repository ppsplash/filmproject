export const removeMovieFromLocalMovieData = (obj) => {
  const currentData = loadLocalMovieData();
  const newData = currentData.filter((el) => {
    return el.id !== obj.id;
  });
  localStorage.setItem("data", JSON.stringify(newData));
};

export const loadLocalMovieData = () => {
  const dataString = localStorage.getItem("data");
  return dataString ? JSON.parse(dataString) : [];
};

export const createSetFromLocalMovieData = () => {
  // Creating a Set from the local Storage data allows us to perform a lookup of O(1) later in forEach loops
  const ret = new Set(loadLocalMovieData().map((item) => item.id));
  return ret;
};

export const addMovieToLocalMovieData = (movie) => {
  const data = loadLocalMovieData();
  data.push(movie);
  localStorage.setItem("data", JSON.stringify(data));
};

export const updateMovieInLocalMovieData = (newObj) => {
  const data = loadLocalMovieData();
  const newData = data.map((currentObj) => {
    return currentObj.id === newObj.id ? newObj : currentObj;
  });
  localStorage.setItem("data", JSON.stringify(newData));
};
