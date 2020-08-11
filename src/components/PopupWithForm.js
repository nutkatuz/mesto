import Popup from './Popup.js';
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
export default class PopupWithForm extends Popup {
    constructor(popup, { handleSubmit }) {
        super(popup) // Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
        this._handleSubmit = handleSubmit
    }
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input')
        this._formValues = {}
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
            
        });
        return this._formValues; // возвращает объект {input.name: input.value}
        console.log(this._formValues)
    }

    open() {
        this.setEventListeners()
        super.open()
    }
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        super.close()
        this._popup.querySelector('.popup__window').reset()
        this.removeEventListeners()
    }
    // Перезаписывает родительский метод setEventListeners, 
    setEventListeners() { // кт должен не только добавлять обработчик клика иконке закрытия,
        super.setEventListeners()
        // но и добавлять обработчик сабмита формы.
        this._popup.querySelector('.popup__window').addEventListener('submit', this._submitHandler)
    }

    removeEventListeners() {
        super.removeEventListeners()
        this._popup.querySelector('.popup__window').removeEventListener('submit', this._submitHandler)
    }

    _submitHandler = (event) => {
        event.preventDefault()
        const data = this._getInputValues() //собрали данные из инпутов
        this._handleSubmit(data) //.передали их в колбэк сабмита формы
    }
}