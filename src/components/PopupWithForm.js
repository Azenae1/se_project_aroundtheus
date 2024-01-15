import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__save-button");
    this._submitBtnDefault = this._submitBtn.textContent;
    this._inputValues = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    //collects data from input fields
    const formData = {};
    this._inputValues.forEach((input) => {
      formData[input.name] = input.value;
    });
    //returns data as object
    return formData;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = this._submitBtnDefault;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    //add submit EventListener
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      debugger;
      this._handleFormSubmit(this._getInputValues(), this._submitBtn);
      this.close();
    });
  }
}
