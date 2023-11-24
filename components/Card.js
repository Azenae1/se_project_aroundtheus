export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__favorite-button")
      .addEventListener("click", () => {
        this._handleFavIcon();
      });
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDelIcon();
      });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
    //
  }

  _handleFavIcon() {
    this._cardElement
      .querySelector(".card__favorite-button")
      .classList.toggle("card__favorite-button_pressed");
  }

  _handleDelIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    this._handleImageClick({ name: this._name, link: this._link });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    //getCardEl (view)
    this._cardElement.querySelector(
      "#card-image"
    ).style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector("#card-name").textContent = this._name;
    this._setEventListeners();
    //return card
    return this._cardElement;
  }
}
