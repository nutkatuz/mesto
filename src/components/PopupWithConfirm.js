import Popup from './Popup.js'
export default class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup)
    }
    open() { // если нажали на корзину, то переопределим на удаление. а то может мы лай подтвердить хотим
        super.open()
            this._popup.querySelector('.popup__button').textContent = "Да"
    }

    submitHandler(handlerDelete) {
        this._handlerDelete = handlerDelete //хендлер следует передавать в конструктор класса при инициализации, чтобы каждый раз при открытии не выполнять лишних действий////В этой функции не будет необходимости, если вы будете передавать функцию-хендер в конструктор класса. Либо же, если вы решите оставить этой вариант, то вам следует поменять название функции, т.к. текущее явно не отображает за что она отвечает
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
            event.preventDefault()
            this._popup.querySelector('.popup__button').textContent = "Удаление..."
            //this.renderLoading(true)
            this._handlerDelete()
        })
    }

    // renderLoading(isLoading) {
    //     if (isLoading) {
    //         this._popup.querySelector('.popup__button').textContent = "Удаление..."
    //     } else {
    //         this._popup.querySelector('.popup__button').textContent = "Да"
    //     }
    // }
}