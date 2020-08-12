import Popup from './Popup.js';
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
export default class PopupWithForm extends Popup {
    constructor(popup, { handleSubmit }) {
        super(popup) // Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
        this._handleSubmit = handleSubmit
    }
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        this._object = {};
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._inputList.forEach((input) => {
          this._object[input.name] = input.value; 
        });// возвращает объект {input.name: input.value} из имён инпутов и значений инпутов
        return this._object;
    } 

    open() {
        this.setEventListeners()
        super.open()
        this._popup.querySelector('.popup__window').reset()
    }
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        // this._popup.querySelector('.popup__window').reset()//некрасиво при закрытии скидывать, их видно когда гаснет окно
        this._removeEventListeners()
        super.close()
    }
    // Перезаписывает родительский метод setEventListeners, 
    setEventListeners() { // кт должен не только добавлять обработчик клика иконке закрытия,
        super.setEventListeners()
        // но и добавлять обработчик сабмита формы.
        this._popup.querySelector('.popup__window').addEventListener('submit', this._formSubmit)
    }

    _removeEventListeners() {
        super.removeEventListeners()
        this._popup.querySelector('.popup__window').removeEventListener('submit', this._formSubmit)
    }

    _formSubmit = (event) => {
        event.preventDefault()
        const data = this._getInputValues() //собрали данные из инпутов
        this._handleSubmit(data) //.передали их в колбэк сабмита формы
    }
}