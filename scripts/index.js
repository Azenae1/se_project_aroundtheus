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

function toggleModalVisibility(modalWindow) {
  modalWindow.classList.toggle("modal_opened");
}

profileEditBtn.addEventListener("click", () => {
  toggleModalVisibility(profileEditModal);
});

profileCloseBtn.addEventListener("click", () => {
  toggleModalVisibility(profileEditModal);
  // profileEditModal.classList.remove("modal_opened");
});
