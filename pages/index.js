import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Church window",
    link: "https://i.pinimg.com/originals/7a/89/e4/7a89e4ded58bb865c17d03a4bb0c6a14.png",
  },
  {
    name: "Lost in the Wild",
    link: "https://i.pinimg.com/originals/4d/7c/ac/4d7cacba2ab863cc401f5c91d656999c.png",
  },
  {
    name: "Light in the night",
    link: "https://i.pinimg.com/originals/08/ab/e5/08abe5b23ea161c330f040785ee21f3f.png",
  },
  {
    name: "Construction grid",
    link: "https://i.pinimg.com/originals/dc/14/be/dc14be6b5cf38d516aa0740653fcbcb6.png",
  },
  {
    name: "Stairs",
    link: "https://i.pinimg.com/originals/04/59/24/045924c2685a15901f44dcc559942afd.png",
  },

  {
    name: "Architecture geometry",
    link: "https://i.pinimg.com/originals/24/ae/fe/24aefe8f2484c22d981e0558727b0652.png",
  },
];

// Elements
const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

const profileEditModal = document.querySelector("#profile-edit-modal");
const editFormEl = profileEditModal.querySelector(".modal__form");

const cardAddModal = document.querySelector("#profile-add-modal");
const addFormEl = cardAddModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormEl);
const addFormValidator = new FormValidator(settings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const profileEditBtn = document.querySelector("#profile-edit-btn");

const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-edit-form"];

//
const cardAddBtn = document.querySelector("#profile-add-btn");

const cardListEl = document.querySelector(".cards__list");

const cardAddForm = document.forms["profile-add-form"];
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

const cardPrevModal = document.querySelector("#card-preview-modal");
const cardImagePrev = document.querySelector(".modal__image-preview");
const cardTitlePrev = document.querySelector(".modal__name-preview");

const modals = document.querySelectorAll(".modal");

// Functions

function openModal(modalWindow) {
  modalWindow.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscButton);
}

function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscButton);
}

function handleEscButton(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleImageClick({ name, link }) {
  cardImagePrev.src = link;
  cardImagePrev.alt = name;
  cardTitlePrev.textContent = name;
  openModal(cardPrevModal);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editFormValidator.disableSubmitButton();
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addFormValidator.disableSubmitButton();
  evt.target.reset();

  closeModal(cardAddModal);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();

  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddBtn.addEventListener("click", () => {
  cardTitleInput.value = "";
  cardUrlInput.value = "";

  openModal(cardAddModal);
});

cardAddForm.addEventListener("submit", handleAddCardSubmit);

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
