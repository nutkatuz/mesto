export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }

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

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('mousedown', this._closeButtonHandler)
        this._popup.addEventListener('mousedown', this._closeOverlayHandler);
    }

    open() {
        this._popup.classList.add('popup_is-opened')
        this.setEventListeners();
        
        document.addEventListener('keydown', this._closeEscHandler);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._closeEscHandler);
    }

    close() {
        this._popup.classList.remove('popup_is-opened')
        this._removeEventListeners()
    }
}



// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:Принимает в конструктор единственный параметр — селектор попапа. Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 

// Данная функция (setEventListeners) должна вызываться только один раз из index.js - в смысле по одному разу на каждый попап?....._removeEventListeners - оставить в ней только удаление обработчика на ESC, т.к. остальные будут внутри функции setEventListeners, которая будет вызвана только один раз, и эти обработчики не нужно будет удалять