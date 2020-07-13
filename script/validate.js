// включение валидации вызовом enableValidation
// // все настройки передаются при вызове
// для всех полей ввода в формах включена лайв-валидация;
// // кнопка отправки формы неактивна, если хотя бы одно из полей не проходит валидацию;
// для проверки данных в поле используются HTML5-атрибуты и JS-свойство ValidityState;
// функция enableValidation, которая включает валидацию, принимает на вход объект параметров, а затем передаёт параметры вложенным функциям.
function validate (input, controlSelector, errorSelector) {
  console.log(input.validity);
  
  const errorElement = input.closest(controlSelector).querySelector(errorSelector);
  
  
  if (!input.checkValidity()) {
      const error = getErrorMessage(input);
      setError(error, errorElement)
  } else {
      setError('', errorElement);
  }
}
// эта функция хочет строку из getErrorMessage
function setError(message, errorElement) {
  errorElement.textContent = message;
}
//
function getErrorMessage(input) {
  if (input.validity.valueMissing) {
      return input.validationMessage;
  }

  if (!isUrl(input)) {
      return 'Введите уже урл';
  }
}

function isUrl (input) {
  return input.value.substring(0, 5) === 'https';
}

function enableValidation({ formSelector, controlSelector, inputSelector, errorSelector }) {
  const form = document.querySelector(formSelector);
  const inputs = form.querySelectorAll(inputSelector);
  
  form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      if (form.checkValidity()) {
          alert('Вы успешно зарегистрировались')
      } else {
          inputs.forEach((input) => validate(input, controlSelector, errorSelector));
      }
  });
}

enableValidation({//config
  controlSelector: '.form__control', //это лейбл 0:49,находим ошибку.
  errorSelector: '.form__error',
    formSelector: '.popup__form',/////
    inputSelector: '.popup__input',///
    submitButtonSelector: '.popup__button',/////
    inactiveButtonClass: 'popup__button_disabled',/////
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  
  // setSubmitButtonState(false);
// });

// form.addEventListener('input', function (evt) { 
//   const isValid = (artist.value.length > 0 && title.value.length > 0)
//   setSubmitButtonState(isValid)
// });

// const formInput = formElement.querySelector('.popup__input_name');
// console.log(formInput.id);
// const formError = formElement.querySelector(`#${formInput.id}-error`);