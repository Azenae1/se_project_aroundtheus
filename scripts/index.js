const initialCards = [
  {
    name: "Architecture geometry",
    link: "https://imgur.com/xyupL3w",
  },
  {
    name: "Lost in the Wild",
    link: "https://imgur.com/49utHPV",
  },
  {
    name: "Tretyakov gallery",
    link: "https://imgur.com/Pct2VsM",
  },
  {
    name: "Construction grid",
    link: "https://imgur.com/pRck4w7",
  },
  {
    name: "Church window",
    link: "https://imgur.com/pxdVMpn",
  },
  {
    name: "Stairs",
    link: "https://imgur.com/FYpxoNh",
  },
];

console.log(initialCards);

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector("#modal-close-btn");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

function toggleModalVisibility(modalWindow) {
  modalWindow.classList.toggle("modal_opened");
}

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();

  toggleModalVisibility(profileEditModal);
});

profileCloseBtn.addEventListener("click", () => {
  toggleModalVisibility(profileEditModal);
  // profileEditModal.classList.remove("modal_opened");
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  toggleModalVisibility(profileEditModal);
});
