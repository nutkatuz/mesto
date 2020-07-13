
// для проверки данных в поле используются HTML5-атрибуты и JS-свойство ValidityState;
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};
// const showInputError = (config, formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(config.inputElement);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorElement);
// };

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
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
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(( ) => {
    return !inputElement.validity.valid;
  });
}
// кнопка отправки формы неактивна, если хотя бы одно из полей не проходит валидацию;
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
}







// const hideInputError = (config, formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputElement);
//   errorElement.classList.remove(config.errorElement);
//   errorElement.textContent = '';
// };

// const isValid = (config, formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//       showInputError(config, formElement, inputElement, inputElement.validationMessage);
//   } else {
//       hideInputError(config, formElement, inputElement);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//   })
// };

// const toggleButtonState = (config, inputList, inactiveButtonElement) => {
//   if (hasInvalidInput(inputList)) {
//       inactiveButtonElement.classList.add(config.inactiveButtonClass);
//       inactiveButtonElement.setAttribute('disabled', true);
//   } else {
//       inactiveButtonElement.classList.remove(config.inactiveButtonClass);
//       inactiveButtonElement.removeAttribute('disabled');
//   }
// };

// const setEventListeners = (formElement, config) => {
//   const buttonElement = formElement.querySelector(config.buttonElement);
//   const inputList = Array.from(formElement.querySelectorAll(config.inputList));
//   toggleButtonState(config, inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//           isValid(config, formElement, inputElement);
//           toggleButtonState(config, inputList, buttonElement);
//       });
//   });
// };

// const enableValidation = (config) => {
//   const {formSelector, inputList, buttonElement, inactiveButtonClass, inputElement, errorElement} = config;
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//           evt.preventDefault();
//       });
//       setEventListeners(formElement, config);
//   });
// };
