export default class Card {//создать клон
    constructor(item, cardTemplateSelector, configCard) {
        // this._handleCardClick = handleCardClick;
        this._name = item.name
        this._link = item.link
        this._cardSelector = cardTemplateSelector
        this._zoomImage = document.querySelector(configCard.zoomImageSelector)
        this._zoomTitle = document.querySelector(configCard.zoomTitleSelector)
    }

    _getTemplate() {
        const card = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true)
        return card
    }

    _setEventListener() {
        this._card.querySelector('.card__image').addEventListener('click', () => this._handleCardClick())
        this._card.querySelector('.card__recycle-bin').addEventListener('click', () => this._clear())
        this._card.querySelector('.card__like').addEventListener('click', () => this._like())
    }

    _like() {
        this._card.querySelector('.card__like').classList.toggle('card__like_active')
    }

    _clear() {
        this._card.closest('.card').remove()
    }
// Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
// Эта функция должна открывать попап с картинкой при клике на карточку.
    _handleCardClick() {
        const popupZoom = document.querySelector('.popup_zoom');
        popupZoom.classList.add('popup_is-opened')
        // document.addEventListener('keyup', closePopupByEscOrOverlay)

        this._zoomImage.setAttribute('src', `${this._link}`)
        this._zoomImage.setAttribute('alt', `Изображение ${this._name}`)
        this._zoomTitle.textContent = this._name
    }
    
    generateCard() {
        this._card = this._getTemplate()
        this._setEventListener()
        this._card.querySelector('.card__title').textContent = this._name
        this._card.querySelector('.card__image').src = this._link
        this._card.querySelector('.card__image').setAttribute('alt', `Не удалось загрузить изображение "${this._name}"`)
        return this._card
    }
}