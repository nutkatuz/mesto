import { openPopup } from './utils.js'
export const popupZoom = document.querySelector('.popup_zoom')
const zoomImage = document.querySelector('.zoom__image')
const zoomTitle = document.querySelector('.zoom__caption')

export class Card {
    constructor(item, cardSelector) { // принимает в конструктор её данные и селектор её template-элемента;
        this._name = item.name
        this._link = item.link
        this._cardSelector = cardSelector
    }

    _getTemplate() {
        const card = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true)
        return card;
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
        zoomTitle.textContent = this._name
        zoomImage.setAttribute('src', `${this._link}`)
        zoomImage.setAttribute('alt', `Изображение ${this._name}`)
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