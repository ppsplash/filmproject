import { loadLocalMovieData } from "../storage/localData.js";
import { createNotification } from "../ui/notifications.js";
import { updateMovieInLocalMovieData, addMovieToLocalMovieData } from "../storage/localData.js";

/* Note:
We are working with "event delegation" attaching the event handler on the movie card container which is already in the DOM.
This is also the best approach when there will be many additional cards added later, as otherwise we would need to attach
an event handler tho these manually every time. We return the return value from the function so as not to run the rest of
the checks.
*/

export const setupMovieEvents = () => {
  moviesListHook.addEventListener("click", (clickEvent) => {
    const heart = clickEvent.target.closest(".movieHeart");
    if (heart) return handlerHeartClick(heart);
    const note = clickEvent.target.closest(".movieNote");
    if (note) return handleNoteClick(note);
    const closeButton = clickEvent.target.closest(".closeButton");
    if (closeButton) return handleCloseButtonClick(closeButton);
    const noteSaveButton = clickEvent.target.closest(".saveNote");
    if (noteSaveButton) return handleNoteSaveButtonClick(noteSaveButton);
  });
};

const handlerHeartClick = (heart) => {
  const svg = heart.querySelector("svg");
  const data = loadLocalMovieData();
  const foundObj = data.find((el) => el.id === Number(heart.getAttribute("data-id")));
  // If we have found an entry and the isFavorite property is true we must remove that status
  if (foundObj && foundObj.isFavorite === true) {
    foundObj.isFavorite = false;
    updateMovieInLocalMovieData(foundObj);
    svg.classList.remove("fill-red-600", "opacity-100");
    svg.classList.add("fill-white", "opacity-50");
    createNotification("Movie removed from your favorites");
    // If we are on the journal page we should also remove that movie from the dom
    if (document.querySelector("body").id === "journalPage") {
      heart.closest(".movieCard").remove();
    }
  }
  // Else we must add it as as favorite
  else {
    svg.classList.remove("fill-white", "opacity-50");
    svg.classList.add("fill-red-600", "opacity-100");
    createNotification("Movie added to your favorites");
    // If we already have an object we must update it
    if (foundObj) {
      foundObj.isFavorite = true;
      updateMovieInLocalMovieData(foundObj);
    }
    // Else we don't have an object at all and must add it from scratch
    else {
      addMovieToLocalMovieData({
        id: Number(heart.getAttribute("data-id")), // Need to convert html element id to Number before passing the object
        isFavorite: true,
      });
    }
  }
};

const handleNoteClick = (note) => {
  const data = loadLocalMovieData();
  const movieID = Number(note.getAttribute("data-id"));
  const foundObj = data.find((el) => el.id === movieID);
  const movieNote = foundObj?.note ?? "";
  const addNoteContainer = document.createElement("div");
  addNoteContainer.classList.add("noteInputContainer", "absolute", "w-full", "top-0", "left-0");
  addNoteContainer.innerHTML = `
      <div class="overlay"></div>
      <div class="flex justify-center">
        <div class="textInput fixed z-20 bg-neutral-900 top-0 p-10 m-auto my-40 text-white rounded-md max-w-4/5 flex-1">
          <div class="closeButton cursor-pointer absolute -top-4 -right-4 h-10 w-10 p-1 flex justify-center rounded-full bg-neutral-900">
            <svg fill="white"><use href="#close"></use></svg>
          </div>
          <h2 class="mb-2">Your notes</h2>
          <textarea class="w-4xl max-w-full border border-neutral-800 h-52 p-2" name="note">${movieNote}</textarea>
          <button data-id="${movieID}" class="saveNote block mt-4">Save notes</button>
        </div>
      </div>
    `;
  moviesListHook.appendChild(addNoteContainer);
};

const handleCloseButtonClick = (closeButton) => {
  const noteContainers = document.querySelectorAll(".noteInputContainer");
  noteContainers.forEach((container) => {
    moviesListHook.removeChild(container);
  });
};

const handleNoteSaveButtonClick = (button) => {
  // We want the textarea content but currently only have the clicked button. To get the textarea we go up the DOM tree from our element
  const wrapper = button.closest(".textInput");
  const textarea = wrapper?.querySelector("textarea");
  const data = loadLocalMovieData();
  const filmID = Number(button.getAttribute("data-id"));
  const foundObj = data.find((el) => el.id === filmID);
  if (foundObj) {
    // If we have found a saved movie we need to update it
    foundObj.note = textarea.value;
    updateMovieInLocalMovieData(foundObj);
  } else {
    // Otherwise we create it
    addMovieToLocalMovieData({ id: filmID, note: textarea.value });
  }
  const noteEditText = document.querySelector(`.movieNote[data-id="${filmID}"]`);
  noteEditText.innerText = "Edit note";
  noteEditText.classList.add("font-bold", "text-white");
  createNotification("Note saved");
  handleCloseButtonClick();
};
