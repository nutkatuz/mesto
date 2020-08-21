import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open({name, link}) {
    super.open();
    const image = this._popup.querySelector('.zoom__image')
    image.src = link;
    image.alt = name;
    this._popup.querySelector('.zoom__caption').textContent = name;
  }

  setEventListeners() {
    super.setEventListeners()
  }
}


// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.