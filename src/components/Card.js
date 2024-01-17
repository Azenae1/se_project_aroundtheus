export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDelIcon,
    handleFavIcon,
    handleDislike
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelIcon = handleDelIcon;
    this._handleFavIcon = handleFavIcon;
    this._handleDislike = handleDislike;
  }

  _setEventListeners() {
    this._cardFavIcon.addEventListener("click", () => {
      if (this._isLiked) {
        this._handleDislike(this);
      } else {
        this._handleFavIcon(this);
      }
    });
    this._cardDelIcon.addEventListener("click", () => {
      this._handleDelIcon(this);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  toggleFavIcon() {
    this._cardFavIcon.classList.toggle("card__favorite-button_pressed");
  }

  handleDelIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    const id = this._id;
    return id;
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

    if (this._isLiked) {
      this._cardFavIcon.classList.add("card__favorite-button_pressed");
    } else {
      this._cardFavIcon.classList.remove("card__favorite-button_pressed");
    }

    this._setEventListeners();
    return this._cardElement;
  }
}
