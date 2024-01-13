import Api from "../components/API.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import {
  profileAvatarBtn,
  profileEditBtn,
  profileNameInput,
  profileDescriptionInput,
  cardAddBtn,
} from "../utils/constants.js";

import "./index.css";

// Elements

const editFormEl = document.forms["profile-edit-form"];
const addFormEl = document.forms["profile-add-form"];
const avatarFormEl = document.forms["avatar-edit-form"];

const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// Variables

const editFormValidator = new FormValidator(settings, editFormEl);
const profileAvatarValidator = new FormValidator(settings, avatarFormEl);
const addFormValidator = new FormValidator(settings, addFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileAvatarValidator.enableValidation();

cardAddBtn.addEventListener("click", () => {
  newCardPopup.open();
});
profileAvatarBtn.addEventListener("click", () => {
  avatarEditPopup.open();
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d116fd12-6c63-4575-acfb-58f1bbf2e648",
    "Content-Type": "application/json",
  },
});

const newCardPopup = new PopupWithForm("#profile-add-modal", (link) => {
  newCardPopup.renderLoading(true);
  api
    .addCard(link)

    .then((res) => {
      cardSection.addItem(res);
      newCardPopup.close();
      addFormValidator.toggleButtonState();
    })
    .catch((err) => {
      console.error(`Something went wrong: ${err}`);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm("#profile-edit-modal", (values) => {
  userInfo.setUserInfo(values);
  profileEditPopup.renderLoading(true);
  api
    .setUserInfo(values)
    .then(() => {
      profileEditPopup.close();
      editFormValidator.toggleButtonState();
    })
    .catch((err) => {
      console.error(`Something went wrong: ${err}`);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });
});
profileEditPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", (url) => {
  avatarEditPopup.renderLoading(true);

  api
    .setUserAvatar(url)
    .then((res) => {
      userInfo.setUserAvatar(res);
      avatarEditPopup.close();
      profileAvatarValidator.toggleButtonState();
    })
    .catch((err) => {
      console.error(`Something went wrong: ${err}`);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
});
avatarEditPopup.setEventListeners();

const cardDeletePopup = new PopupCardDelete("#card-delete-modal");
cardDeletePopup.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: "#profile-name",
  profileDescriptionSelector: "#profile-description",
  profileAvatar: "#profile-avatar",
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

function deleteCard(card) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        cardDeletePopup.close();
        card.handleDelIcon();
      })
      .catch((err) => {
        console.error(`Something went wrong: ${err}`);
      });
  });
}

//API

api
  .getUserInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
  })
  .catch((err) => {
    console.error(`Something went wrong: ${err}`);
  });

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
        items: cards,
      }
      // selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(`Something went wrong: ${err}`);
  });
