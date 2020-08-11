// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
export default class Popup {
    // Принимает в конструктор единственный параметр — селектор попапа.
    constructor(popup) {
        this._popup = popup;
    }
    // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    _closeEscHandler = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    _closeButtonHandler = () => {
        this.close()
    }
    _closeOverlayHandler = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close()
        }
    }
    // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', this._closeButtonHandler)
        this._popup.addEventListener('click', this._closeOverlayHandler);
        document.addEventListener('keydown', this._closeEscHandler);
    }
    removeEventListeners() {
        this._popup.querySelector('.popup__close').removeEventListener('click', this._closeButtonHandler)
        this._popup.removeEventListener('click', this._closeOverlayHandler);
        document.removeEventListener('keydown', this._closeEscHandler);
    }
    // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    open() {
        this._popup.classList.add('popup_is-opened') //Cannot read property 'classList' of null
        this.setEventListeners();
    }
    close() {
        this._popup.classList.remove('popup_is-opened')
        this.removeEventListeners()
    }
}