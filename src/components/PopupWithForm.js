import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, { handleSubmit }) {
        super(popup)
        this._handleSubmit = handleSubmit
    }
    
    _getInputValues() {
        this._object = {};
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._inputList.forEach((input) => {
        this._object[input.name] = input.value; 
        });
        return this._object;
    } 

    setEventListeners() {
        super.setEventListeners()
        this._popup.querySelector('.popup__form').addEventListener('submit', this._formSubmit)
        // super.close()
    }

    _formSubmit = (event) => {
        event.preventDefault()
        this._handleSubmit( this._getInputValues() ) 
    }

    open() {
        this._popup.querySelector('.popup__form').reset()
        this.setEventListeners()
        super.open()
    }

    disableBtn(popup){
        const submitButton = popup.querySelector('.popup__button')
        submitButton.classList.add('popup__button_disabled')
        submitButton.setAttribute('disabled', false)
    }

    ableBtn(popup){
        const submitButton = popup.querySelector('.popup__button')
        submitButton.classList.remove('popup__button')
        submitButton.removeAttribute('disabled')
    }
}

// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:Кроме селектора попапа принимает в конструктор колбэк сабмита формы.Содержит приватный метод _getInputValues, который собирает данные всех полей формы.Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
// _object возвращает объект {input.name: input.value} из имён инпутов и значений инпутов
// _formSubmit если поставить в обработчик, то 2 шт карточек одинаковых выводит.
// ресетим формы при открытии - сбрасываем значения полей
// при первом открытии нужно чтобы кнпка была активной в первом и неактивной во втором

// при дабл-клике на сохранить форма срабатывает и сохраняет 2 шт