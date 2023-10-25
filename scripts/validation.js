function showInputError(formEl, inputEl, { inputErrorClass }) {
  const errorMessageEl = formEl.querySelector(`#` + inputEl.id + `-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function checkInputValidity(formEl, inputEl, opt) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, opt);
  } else {
    hideInputError(formEl, inputEl, opt);
  }
}

function setEventListeners(formEl, opt) {
  const { inputSelector } = opt;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, opt);
    });
  });
}

function enableValidation(opt) {
  //same as Array.from
  const formEls = [...document.querySelectorAll(opt.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, opt);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
