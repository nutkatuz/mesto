const config = {
  formSelector: '.popup__window',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  redSpanSelector: ".popup__error",
  labelSelector: ".popup__label",
  fieldsetSelector: ".popup__content"
}

const showInputError = (inputSelector, errorMessage, config) => {
  const errorElement = inputSelector.closest(config.labelSelector).querySelector(config.redSpanSelector)
  inputSelector.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

const hideInputError = (inputSelector, config) => {
  const errorElement = inputSelector.closest(config.labelSelector).querySelector(config.redSpanSelector)
  inputSelector.classList.remove(config.inputErrorClass)
  errorElement.classList.remove(config.errorClass)
}

const checkInputValidity = (inputSelector, config) => {
  if(!inputSelector.validity.valid) {
      showInputError(inputSelector, inputSelector.validationMessage, config);//не применилось в ньюКард=ошибка
  } else {
      hideInputError(inputSelector, config)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid
  })
}

function toggleButtonState(inputList, submitButtonSelector, config) {
  if (hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add(config.inactiveButtonClass)
      submitButtonSelector.setAttribute('disabled', false)
  } else {
      submitButtonSelector.classList.remove(config.inactiveButtonClass)
      submitButtonSelector.removeAttribute('disabled')
  }
}

//живая валидация
const setEventListeners = (formSelector, config) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector))
  const submitButtonSelector = formSelector.querySelector(config.submitButtonSelector)
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
          toggleButtonState(inputList, submitButtonSelector, config)
          checkInputValidity(inputSelector, config)
      })
  })
}

const resetFormState = (somepopup, config) => {
  const inputList = Array.from(somepopup.querySelectorAll(config.inputSelector))
  inputList.forEach((inputSelector) => {
    hideInputError(inputSelector, config)
//  const submitButtonSelector = inputSelector.closest(config.fieldsetSelector).querySelector(config.submitButtonSelector)
//  submitButtonSelector.classList.remove(config.inactiveButtonClass) 
//чёрная неактивная кнопка при открытии после ошибки вместо белой.
  })
}

function enableValidation(config) {
  const inputList = Array.from(document.querySelectorAll(config.formSelector))
  inputList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
          evt.preventDefault()
      })
      const fieldsetList = Array.from(formSelector.querySelectorAll(config.fieldsetSelector));
      fieldsetList.forEach((formSelector) => {
        setEventListeners(formSelector, config);
      })
  })
}

enableValidation(config)