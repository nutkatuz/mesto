const showInputError = (inputElement, errorMessage) => {
    // console.log(input.validity);
  // const errorElement = input.closest(controlSelector).querySelector(errorSelector) 
  const errorElement = inputElement.closest('.form__control').querySelector(`.popup__error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = (formElement.querySelector('.popup__button'))
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__content'));
    fieldsetList.forEach((labelSelector) => {
      setEventListeners(labelSelector);
    });
  });
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
}
//config:
enableValidation({
inputErrorClass: "popup__input_type_error",
errorClass: "popup__error_visible",
inputSelector: ".popup__input",
submitButtonSelector: ".popup__button",
formSelector: ".popup__form",
inactiveButtonClass: "popup__button_disabled",
redSpanSelector: ".popup__error",
labelSelector: ".form__control",
fieldsetSelector: '.popup__content'
})