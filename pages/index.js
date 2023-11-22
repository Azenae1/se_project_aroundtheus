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

console.log(initialCards);

//delete
const cardData = {
  name: "Church window",
  link: "https://i.pinimg.com/originals/7a/89/e4/7a89e4ded58bb865c17d03a4bb0c6a14.png",
};
const card = new Card(cardData, "#card-template");
card.getView();

// Elements
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: ".modal__save-button_disabled",
  inputErrorClass: ".modal__error",
  errorClass: ".???",
};
const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = cardAddModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const addFormValidator = new FormValidator(validationSettings, addFormEl);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-edit-form"];
//
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
//
const cardAddBtn = document.querySelector("#profile-add-btn");
const cardAddModal = document.querySelector("#profile-add-modal");
const cardAddForm = document.forms["profile-add-form"];
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
//
const cardPrevModal = document.querySelector("#card-preview-modal");
const cardImagePrev = document.querySelector("#card-image");
const cardTitlePrev = document.querySelector("#card-name");
const closeButtons = document.querySelectorAll(".modal__close-button");
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

function toggleLikeButton(like) {
  like.classList.toggle("card__favorite-button_pressed");
}

function handleDeleteButton(card) {
  card.remove();
}

function handleEscButton(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardNameEl = cardElement.querySelector("#card-name");
  const likeBtn = cardElement.querySelector(".card__favorite-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardNameEl.textContent = cardData.name;

  likeBtn.addEventListener("click", () => {
    toggleLikeButton(likeBtn);
  });
  deleteBtn.addEventListener("click", () => {
    handleDeleteButton(cardElement);
  });
  cardImageEl.addEventListener("click", () => {
    cardImagePrev.src = cardData.link;
    cardImagePrev.alt = cardData.name;
    cardTitlePrev.textContent = cardData.name;
    openModal(cardPrevModal);
  });

  return cardElement;
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();

  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
});

cardAddBtn.addEventListener("click", () => {
  openModal(cardAddModal);
});

cardAddForm.addEventListener("submit", (a) => {
  a.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);

  closeModal(cardAddModal);
  cardAddForm.reset();
});

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
