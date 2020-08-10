import Popup from './Popup.js';
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        // Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);

        this._handleFormSubmit = handleFormSubmit;
    }

    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {this._formValues[input.name] = input.value});
        return this._formValues;// возвращает объект {input.name: input.value}
    }
    
    // Перезаписывает родительский метод setEventListeners, 
    setEventListeners() {
        super.setEventListeners()
// кт должен не только добавлять обработчик клика иконке закрытия,
        this._popup.querySelector('.popup__close').addEventListener('click', () => super.close())//работает
        this._popup.addEventListener('mousedown', this._handleEscOverlayClose)        
// но и добавлять обработчик сабмита формы.
        this._form = this._popup.querySelector('.popup__window');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues() //= this._handleFormSubmit(this._getInputValues() ); ругается "не функ"
            this._formSubmitHandler(data);
            super.close()
        })
    }
}
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
//мне это не надо
    // close() {     
    //     this._popup.classList.remove('popup_is-opened')
    //     document.removeEventListener('keyup', this._handleEscOverlayClose)
    // }
