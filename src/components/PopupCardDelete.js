import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__save-button");
    this._submitBtnDefault = this._submitBtn.textContent;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Deleting...";
    } else {
      this._submitBtn.textContent = this._submitBtnDefault;
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
