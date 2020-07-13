const showInputError = (inputSelector, errorMessage, config) => {
  const errorElement = inputSelector.closest(config.labelSelector).querySelector(config.redSpanSelector);
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (inputSelector, config) => {
  const errorElement = inputSelector.closest(config.labelSelector).querySelector(config.redSpanSelector);
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (inputSelector, config) => {
  if(!inputSelector.validity.valid) {
      showInputError(inputSelector, inputSelector.validationMessage, config);
  } else {
      hideInputError(inputSelector, config);
  }
};
//живая валидация
const setEventListeners = (formSelector, config) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
  const submitButtonSelector = formSelector.querySelector(config.submitButtonSelector);
  
  inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
          // toggleButtonState(inputList, submitButtonSelector, config);
          checkInputValidity(inputSelector, config);
      });
  });
};

const firstStatePopup = (formSelector, config) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
  inputList.forEach((inputSelector) => {//не показываем ошибки, не пугаем
    hideInputError(inputSelector, config);
  });
  //но кнопка неактивна
  const submitButtonSelector = formSelector.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, submitButtonSelector, config);
};
//-----------------------------------------------------
function enableValidation(config) {
  const formElements = Array.from(document.querySelectorAll(config.formSelector));
  formElements.forEach((formSelector) => {
    firstStatePopup(formSelector, config);
      formSelector.addEventListener('submit', (event) => {
          event.preventDefault();
      });
      setEventListeners(formSelector, config);
  });
};

// кнопка отправки формы неактивна, если хотя бы одно из полей не проходит валидацию;
function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
  });
};
function toggleButtonState(inputList, submitButtonSelector, config) {
  if (hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(config.inactiveButtonClass);
  } else {
      submitButtonSelector.classList.remove(config.inactiveButtonClass);
      submitButtonSelector.removeAttribute('disabled');
  }
};

//config
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',    
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
//   redSpanSelector: ".popup__error",
//   labelSelector: ".form__control"
// });