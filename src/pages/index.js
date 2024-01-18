import Api from "../components/API.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";
import {
  editFormEl,
  addFormEl,
  avatarFormEl,
  profileAvatarBtn,
  profileEditBtn,
  profileNameInput,
  profileDescriptionInput,
  cardAddBtn,
} from "../utils/constants.js";

import "./index.css";

// Variables

const userInfo = new UserInfo({
  profileNameSelector: "#profile-name",
  profileDescriptionSelector: "#profile-description",
  profileAvatar: "#profile-avatar",
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d116fd12-6c63-4575-acfb-58f1bbf2e648",
    "Content-Type": "application/json",
  },
});

let cardSection;
api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section(createCard, ".cards__list");
    cardSection.renderItems(res);
  })
  .catch((err) => {
    console.error(`Something went wrong: ${err}`);
  });
api
  .getUserInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
  })
  .catch((err) => {
    console.error(`Something went wrong: ${err}`);
  });

const editFormValidator = new FormValidator(settings, editFormEl);
const addFormValidator = new FormValidator(settings, addFormEl);
const profileAvatarValidator = new FormValidator(settings, avatarFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileAvatarValidator.enableValidation();

const popupWithImage = new PopupWithImage("#card-preview-modal");
popupWithImage.setEventListeners();

const cardDeletePopup = new PopupCardDelete("#card-delete-modal");
cardDeletePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#profile-add-modal", (link) => {
  newCardPopup.renderLoading(true);
  api
    .addCard(link)

    .then((res) => {
      // console.log(res.link);
      cardSection.addItem(link);
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

const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", (url) => {
  avatarEditPopup.renderLoading(true);

  api
    .setUserAvatar(url)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
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

const profileEditPopup = new PopupWithForm("#profile-edit-modal", (values) => {
  // userInfo.setUserInfo(values);
  profileEditPopup.renderLoading(true);
  api
    .setUserInfo(values)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
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

cardAddBtn.addEventListener("click", () => {
  newCardPopup.open();
});
profileAvatarBtn.addEventListener("click", () => {
  avatarEditPopup.open();
});

profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  editFormValidator.resetValidation();
  profileEditPopup.open();
});

// Functions

function createCard(cardData) {
  // console.log("cardIndx", cardData);
  const cardEl = new Card(
    cardData,
    "#card-template",

    //handles Image click
    function handleImageClick(name, link) {
      popupWithImage.open(name, link);
    },
    //handles Delete button click
    function handleDeleteBtn(cardInstance) {
      cardDeletePopup.open();

      cardDeletePopup.setSubmitAction(() => {
        cardDeletePopup.renderLoading(true);
        console.log(this._id);
        api
          .deleteCard(cardInstance.getId())

          .then(() => {
            cardInstance.handleDelIcon();
            cardDeletePopup.close();
          })
          .catch((err) => {
            console.error(`Something went wrong: ${err}`);
          })
          .finally(() => {
            cardDeletePopup.renderLoading(false);
          });
      });
    },
    //handles Like Button Click
    function handleFavIcon(cardInstance) {
      api
        .addLike(cardInstance.getId())
        .then(() => {
          cardEl.toggleFavIcon();
        })
        .catch((err) => {
          console.error(`Something went wrong: ${err}`);
        });
    },
    //removes Like Button
    function handleDislike(cardInstance) {
      api
        .deleteLike(cardInstance.getId())
        .then(() => {
          cardInstance.toggleFavIcon();
        })
        .catch((err) => {
          console.error(`Something went wrong: ${err}`);
        });
    }
  );

  return cardEl.getView();
}

// function deleteCard(card) {
//   cardDeletePopup.open();
//   cardDeletePopup.setSubmitAction(() => {
//     api
//       .deleteCard(card.getId())
//       .then(() => {
//         cardDeletePopup.close();
//         card.handleDelIcon();
//       })
//       .catch((err) => {
//         console.error(`Something went wrong: ${err}`);
//       });
//   });
// }

//API

// const cardSection = new Section(createCard, ".cards__list");
// api
//   .getInitialCards()
//   .then((res) => {
//     cardSection.renderItems(res);
//   })
//   .catch((err) => {
//     console.error(`Something went wrong: ${err}`);
//   });

// cardSection.renderItems();

// function handleAddCardSubmit(formData) {
//   cardSection.addItem(createCard({ name: formData.title, link: formData.url }));
//   addFormValidator.disableSubmitButton();
//   newCardPopup.close();
// }

// function handleProfileEditSubmit() {
//   profileName.textContent = profileNameInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   editFormValidator.disableSubmitButton();

//   profileEditPopup.close();
// }
