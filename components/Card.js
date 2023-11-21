export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
