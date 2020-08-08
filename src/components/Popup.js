// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
export default class Popup {
    constructor(popupSelector) {
// Принимает в конструктор единственный параметр — селектор попапа.
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
    _handleEscOverlayClose(e) {
        if (e.target.classList.contains('popup_is-opened') || (e.key == 'Escape')) {
            const openedPopup = document.querySelector('.popup_is-opened')
            if (openedPopup) {
                openedPopup.classList.remove('popup_is-opened')
            }
        }
    }
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => this.close())
        this._popup.addEventListener('mousedown', this._handleEscOverlayClose)
    }
    
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    open() {
        this._popup.classList.add('popup_is-opened')//Cannot read property 'classList' of null
        document.addEventListener('keyup', this._handleEscOverlayClose)
    }
    close() {
        this._popup.classList.remove('popup_is-opened')
        document.removeEventListener('keyup', this._handleEscOverlayClose)
    }
}
