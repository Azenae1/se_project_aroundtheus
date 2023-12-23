import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import {
  profileEditModal,
  profileEditBtn,
  profileNameInput,
  profileDescriptionInput,
  cardAddModal,
  cardAddBtn,
  cardListEl,
} from "../utils/constants.js";

import "./index.css";

// Elements

const editFormEl = profileEditModal.querySelector(".modal__form");

const addFormEl = cardAddModal.querySelector(".modal__form");

const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// const profileEditForm = document.forms["profile-edit-form"];

//

// const cardAddForm = document.forms["profile-add-form"];
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

// const cardPrevModal = document.querySelector("#card-preview-modal");
const cardImagePrev = document.querySelector(".modal__image-preview");
const cardTitlePrev = document.querySelector(".modal__name-preview");

// const modals = document.querySelectorAll(".modal");

// Variables

const editFormValidator = new FormValidator(settings, editFormEl);
const addFormValidator = new FormValidator(settings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardSubmit
);
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

const userInfo = new UserInfo(".profile__name", ".profile__description");

profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  editFormValidator.resetValidation();
  profileEditModal.open();
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".cards__list"
);

cardSection.renderItems();

const popupWithImage = new PopupWithImage("#card-preview-modal");
popupWithImage.setEventListeners();

// Functions

function handleAddCardSubmit(formData) {
  const card = createCard({ name: formData.name, link: formData.link });
  cardSection.addItem(card);
  newCardPopup.close();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editFormValidator.disableSubmitButton();

  closeModal(profileEditModal);
}

function createCard(cardData) {
  const cardEl = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.link, cardData.name);
  });
  return cardEl.getView();
}

// function renderCard(cardData, wrapper) {
//   const card = createCard(cardData, "#card-template", handleImageClick);
//   wrapper.prepend(card);
// }

function handleImageClick({ name, link }) {
  cardImagePrev.src = link;
  cardImagePrev.alt = name;
  cardTitlePrev.textContent = name;
  openModal(popupWithImage);
}

// function openModal(modalWindow) {
//   modalWindow.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscButton);
// }

// function closeModal(modalWindow) {
//   modalWindow.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscButton);
// }

// function handleEscButton(evt) {
//   if (evt.key === "Escape") {
//     const modal = document.querySelector(".modal_opened");
//     closeModal(modal);
//   }
// }

// Event listeners

// profileEditBtn.addEventListener("click", () => {
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent.trim();
//   editFormValidator.resetValidation();

//   openModal(profileEditModal);
// });

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// cardAddBtn.addEventListener("click", () => {
//   openModal(cardAddModal);
// });

// cardAddForm.addEventListener("submit", handleAddCardSubmit);

// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("modal_opened")) {
//       closeModal(modal);
//     }
//     if (evt.target.classList.contains("modal__close-button")) {
//       closeModal(modal);
//     }
//   });
// });

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
