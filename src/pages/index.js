import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import {
  profileEditBtn,
  profileNameInput,
  profileDescriptionInput,
  cardAddBtn,
} from "../utils/constants.js";

import "./index.css";

// Elements

const editFormEl = document.forms["profile-edit-form"];
const addFormEl = document.forms["profile-add-form"];

const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// Variables

const editFormValidator = new FormValidator(settings, editFormEl);
const addFormValidator = new FormValidator(settings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

cardAddBtn.addEventListener("click", () => {
  newCardPopup.open();
});

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

const userInfo = new UserInfo({
  profileNameSelector: "#profile-name",
  profileDescriptionSelector: "#profile-description",
});

profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  editFormValidator.resetValidation();
  profileEditPopup.open();
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
  cardSection.addItem(createCard({ name: formData.title, link: formData.url }));
  addFormValidator.disableSubmitButton();
  newCardPopup.close();
}

function handleProfileEditSubmit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editFormValidator.disableSubmitButton();

  profileEditPopup.close();
}

function createCard(cardData) {
  const cardEl = new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.link, cardData.name);
  });
  return cardEl.getView();
}

/////////
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d116fd12-6c63-4575-acfb-58f1bbf2e648",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    // process the result
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });
