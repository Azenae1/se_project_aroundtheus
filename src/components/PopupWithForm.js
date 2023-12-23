import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  // open() {
  //   this._button.textContent = "Save";
  //   super.open();
  // }

  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    //collects data from input fields
    const inputValues = this._popup.querySelectorAll(".modal__input");
    const data = {};
    inputValues.forEach((input) => {
      data[input.name] = input.value;
    });
    //returns data as object
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    //add submit EventListener
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
