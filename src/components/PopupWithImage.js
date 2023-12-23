import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._popupName = this._popupElement.querySelector(".modal__name-preview");
  }
  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImage.textContent = name;
    super.open();
  }
}
