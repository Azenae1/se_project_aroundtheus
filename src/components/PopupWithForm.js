import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
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

  setEventListeners() {
    super.setEventListeners();
    //add submit EventListener
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
