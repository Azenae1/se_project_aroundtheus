export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardFavIcon.addEventListener("click", () => {
      this._handleFavIcon();
    });
    this._cardDelIcon.addEventListener("click", () => {
      this._handleDelIcon();
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleFavIcon() {
    this._cardFavIcon.classList.toggle("card__favorite-button_pressed");
  }

  _handleDelIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector("#card-image");
    this._cardTitleEl = this._cardElement.querySelector("#card-name");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._cardFavIcon = this._cardElement.querySelector(
      ".card__favorite-button"
    );
    this._cardDelIcon = this._cardElement.querySelector(".card__delete-button");

    this._setEventListeners();
    return this._cardElement;
  }
}
