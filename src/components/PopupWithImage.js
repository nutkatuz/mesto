import Popup from './Popup.js';

// Создайте класс PopupWithImage, который наследует от Popup. 
// Этот класс должен перезаписывать родительский метод open. 
export default class PopupWithImage extends Popup {
    constructor(popupSelector, configCard) {
      super(popupSelector);
      this._popupSelector = popupSelector;
      this._popup = document.querySelector(this._popupSelector);
      this._zoomImage = this._popup.querySelector(configCard.zoomImageSelector) //'.zoom__image', 
      this._zoomTitle = this._popup.querySelector(configCard.zoomTitleSelector) //'.zoom__caption',
    };

    _setEventListeners(){
      super.setEventListeners();
    }
    
    open(data) {// В методе open класса PopupWithImage нужно 
      this._zoomImage.setAttribute('src', `${data.link}`)// вставлять в попап картинку
      this._zoomImage.setAttribute('alt', `Изображение ${data.name}`)//и атрибут src изображения 
      this._zoomTitle.textContent = data.name//и подпись к картинке

      super.open();
    }

}

