export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;

    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl, validationMessage) {
    const errorMessageEl = this._form.querySelector(
      `#` + inputEl.id + `-error`
    );
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(
      `#` + inputEl.id + `-error`
    );
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState({ inactiveButtonClass }) {
    if (_hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  // _setEventListeners() {
  //   this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
  //   this._submitButton = this._form.querySelector(this._submitButtonSelector);
  //   inputEls.forEach((inputEl) => {
  //     inputEl.addEventListener("input", (evt) => {
  //       checkInputValidity(this._form, inputEl, opt);
  //       _toggleButtonState(inputEls, submitButton, opt);
  //     });
  //   });
  // }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._checkInputValidity(inputEl);
    });
    this._toggleButtonState();
  }
}
