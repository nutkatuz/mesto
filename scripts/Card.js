import { openPopup, popupZoom } from './Popups.js'

export class Card {
    constructor(item, cardTemplateSelector, configCard) { // принимает в конструктор её данные и селектор её template-элемента;
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
        this._card.querySelector('.card__image').addEventListener('click', () => this._showZoomPopup())
        this._card.querySelector('.card__recycle-bin').addEventListener('click', () => this._delCard())
        this._card.querySelector('.card__like').addEventListener('click', () => this._doLike())
    }

    _doLike() {
        this._card.querySelector('.card__like').classList.toggle('card__like_active')
    }

    _delCard() {
        this._card.closest('.card').remove()
    }
    
    _showZoomPopup() {
        openPopup(popupZoom)
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