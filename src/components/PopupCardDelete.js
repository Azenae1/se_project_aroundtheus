import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    //   console.log(this._popupForm);
    this._modalDeleteButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  // defaultText() {
  //   this._modalDeleteButton.textContent = "Yes";
  // }

  // deleteText() {
  //   this._modalDeleteButton.textContent = "Deleting...";
  // }

  setEventListeners() {
    this._modalDeleteButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
