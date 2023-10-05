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

// Elements

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = profileEditModal.querySelector("#edit-close-btn");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
//
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
//
const profileAddBtn = document.querySelector("#profile-add-btn");
const profileAddModal = document.querySelector("#profile-add-modal");
const newCardCloseBtn = profileAddModal.querySelector("#add-close-btn");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
//
const cardPrevModal = document.querySelector("#card-preview-modal");
const cardImagePrev = document.querySelector("#card-image");
const cardTitlePrev = document.querySelector("#card-name");
const cardPrevCloseBtn = cardPrevModal.querySelector("#prev-close-btn");

// Functions

function toggleModalVisibility(modalWindow) {
  modalWindow.classList.toggle("modal_opened");
}

function toggleLikeButton(like) {
  like.classList.toggle("card__favorite-button_pressed");
}

function toggleDeleteButton(trash) {
  trash.remove();
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
    toggleDeleteButton(cardElement);
  });
  cardImageEl.addEventListener("click", () => {
    cardImagePrev.src = cardData.link;
    cardImagePrev.alt = cardData.name;
    cardTitlePrev.textContent = cardData.name;
    toggleModalVisibility(cardPrevModal);
  });

  return cardElement;
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent.trim();

  toggleModalVisibility(profileEditModal);
});

profileCloseBtn.addEventListener("click", () => {
  toggleModalVisibility(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  toggleModalVisibility(profileEditModal);
});

profileAddBtn.addEventListener("click", () => {
  toggleModalVisibility(profileAddModal);
});
newCardCloseBtn.addEventListener("click", () => {
  toggleModalVisibility(profileAddModal);
});

profileAddForm.addEventListener("submit", (a) => {
  a.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  toggleModalVisibility(profileAddModal);
});

cardPrevCloseBtn.addEventListener("click", () => {
  toggleModalVisibility(cardPrevModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
