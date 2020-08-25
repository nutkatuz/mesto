import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
    constructor(popup) {
        super(popup)
    }
    open() { // если нажали на корзину, то переопределим на удаление. а то может мы лай подтвердить хотим
        super.open()
    }

    todo(func) {
        this._handlerDelete = func;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
            event.preventDefault();
            this.renderLoading(true);
            this._handlerDelete();
        })
    }

    renderLoading (isLoading) {
        if (isLoading) {
            this._popup.querySelector('.popup__button').textContent = "Удаление...";
        } else {
            this._popup.querySelector('.popup__button').textContent = "Да";
        };
            this.close();
    }
}
// никаких других методов у этого попапа не будет, так как нечего валидировать. нужен метод который позволяет динамически менять функцию кот вызывается при нажатии на кнопку. должна быть возможность при открытии попапа переопределять через публичный метод то действие, которое нужно выполнить при нажатии на кнопку...............