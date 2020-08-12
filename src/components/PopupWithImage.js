import Popup from './Popup.js';

// Создайте класс PopupWithImage, который наследует от Popup. 
// Этот класс должен перезаписывать родительский метод open. 
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
// В методе open класса PopupWithImage нужно 
  open(data) {
    super.open();
    this._popup.querySelector('.zoom__image').src = data.link;// вставлять в попап картинку
    this._popup.querySelector('.zoom__image').alt = data.name;//и атрибут src изображения 
    this._popup.querySelector('.zoom__caption').textContent = data.name;//и подпись к картинке
  }
}