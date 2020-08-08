import Popup from './Popup.js';
// Создайте класс PopupWithImage, который наследует от Popup. 
// Этот класс должен перезаписывать родительский метод open. 
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupSelector = popupSelector;
      this._popup = document.querySelector(this._popupSelector); // null(((
    };
    _setEventListeners(){
      super.setEventListeners();
    }
    
  open(data) {// В методе open класса PopupWithImage нужно 
    // this._zoomImage = this._popup.querySelector('.zoom__image')//Cannot read property 'querySelector' of null
    this._zoomImage = document.querySelector('.zoom__image')////
    this._zoomTitle = document.querySelector('.zoom__caption')//
    this._zoomImage.setAttribute('src', `${data.link}`)
    this._zoomImage.setAttribute('alt', `Изображение ${data.name}`)
    this._zoomTitle.textContent = data.name
    // this._popup.querySelector('.zoom__image').src = data.link;// вставлять в попап картинку
    // this._popup.querySelector('.zoom__image').alt = data.name;//и атрибут src изображения 
    // this._popup.querySelector('.zoom__capture').textContent = data.name;//и подпись к картинке
    super.open();//Cannot read property 'classList' of null
    // document.querySelector('.popup__zoom').classList.add('popup_is-opened')//Cannot read property 'classList' of null
    // document.addEventListener('keyup', this._handleEscOverlayClose)
  }
}

