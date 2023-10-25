function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#` + inputEl.id + `-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#` + inputEl.id + `-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, opt) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, opt);
  } else {
    hideInputError(formEl, inputEl, opt);
  }
}

function toggleButtonState(inputEls, submitBtn, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
    return;
  } else {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
  }
}

function setEventListeners(formEl, opt) {
  const { inputSelector } = opt;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(".modal__save-button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, opt);
      toggleButtonState(inputEls, submitBtn, opt);
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
