import Popup from './Popup.js';
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    }
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {//(((((((((((
  this._inputList = this._element.querySelectorAll('.popup__input');
  this._formValues = {};

  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
    }


// Перезаписывает родительский метод setEventListeners, 
    setEventListeners() {
        // super._setEventListeners();
// кт должен не только добавлять обработчик клика иконке закрытия,
        this._popup.querySelector('.popup__close').addEventListener('click', () => super.close())//работает
        this._popup.addEventListener('mousedown', this._handleEscOverlayClose)
// но и добавлять обработчик сабмита формы.
        const formSubmitHandler = function (evt) {
            evt.preventDefault()
            profileName.textContent = nameInput.value
            profileJob.textContent = jobInput.value
        }
        this._popup.querySelector('.popup__window').addEventListener('submit', formSubmitHandler)
    }
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    // close() {//мне это не надо вроде
    //     this._popup.classList.remove('popup_is-opened')
    //     document.removeEventListener('keyup', this._handleEscOverlayClose)
    // }
}
