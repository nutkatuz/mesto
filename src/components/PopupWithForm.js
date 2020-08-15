import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popup, { handleSubmit }) {
        super(popup)
        this._handleSubmit = handleSubmit
    }
    
    _getInputValues() {
        this._object = {}
        this._inputList = this._popup.querySelectorAll('.popup__input')
        this._inputList.forEach((input) => {
        this._object[input.name] = input.value 
        })
        return this._object
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form').addEventListener('submit', this._formSubmit)
    }

    _formSubmit = (event) => {
        event.preventDefault()
        this._popup.querySelector('.popup__button').textContent = "Сохранение..."
        this._handleSubmit( this._getInputValues() ) 
    }

    open = ()=> {
        this._popup.querySelector('.popup__form').reset()
        super.open()
    }
}