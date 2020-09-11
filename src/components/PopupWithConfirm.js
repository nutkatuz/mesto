import Popup from './Popup.js'
export default class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup)
    }
    
    open() {
        super.open()
        this._popup.querySelector('.popup__button').textContent = "Да"
    }

    submitHandler(handlerDelete) {
        this._handlerDelete = handlerDelete
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
            event.preventDefault()
            this._popup.querySelector('.popup__button').textContent = "Удаление..."
            this._handlerDelete()
        })
    }
}