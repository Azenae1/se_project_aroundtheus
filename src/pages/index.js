import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, settings, selectors } from "../utils/constants.js";

import "./index.css";

// Elements

const newCardPopup = new PopupWithForm("#profile-add-modal", () => {});
const cardSection = new Section({
  renderer: (item) => {
    const cardEl = new Card(item, selectors.cardTemplate);
    cardSection.addItem(cardEl.getView());
  },
  selector: selectors.cardSection,
});

cardSection.renderItems(initialCards);

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
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

function createCard(cardData, cardSelector, handleImageClick) {
  const cardEl = new Card(cardData, cardSelector, handleImageClick);
  return cardEl.getView();
}

function renderCard(cardData, wrapper) {
  const card = createCard(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card);
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();
  editFormValidator.resetValidation();

  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddBtn.addEventListener("click", () => {
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
