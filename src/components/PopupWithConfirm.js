import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
    constructor(popup, { handleSubmit }) {
        super(popup)
        this._handleSubmit = handleSubmit
    }


// никаких других методов у этого попапа не будет, так как нечего валидировать. нужен метод который позволяет динамически менять функцию кот вызывается при нажатии на кнопку. должна быть возможность при открытии попапа переопределять через публичный метод то действие, которое нужно выполнить при нажатии на кнопку...............

open() {
// если нажали на корзину, то переопределим на удаление. а то может мы лай подтвердить хотим
    super.open()
}

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form').addEventListener('submit', this._formSubmit)
    }

    
    _formSubmit = (event) => {
        event.preventDefault()
        this._handleSubmit( this._getInputValues() ) 
        this.close() // при дабл-клике на сохранить форма срабатывает 2p и сохраняет 2 шт, так кнопка остается активной
    }
}