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

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //getCardEl (view)
    this._setEventListeners();
    //return card
  }
}
