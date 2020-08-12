// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
export default class Card { //создать клон
    constructor({
        data,
        handleCardClick
    }, cardTemplateSelector) {
        this._name = data.name //не итем, а дейта! 
        this._link = data.link
        this._cardSelector = cardTemplateSelector
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const card = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true)
        this._card = card;
        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector('.card__image').addEventListener('click', this._handleCardClick)
        // - Эта функция должна открывать PopupWithImage при клике на карточку.
        this._card.querySelector('.card__recycle-bin').addEventListener('click', () => this._clear())
        this._card.querySelector('.card__like').addEventListener('click', () => this._like())
    }

    _like() {
        this._card.querySelector('.card__like').classList.toggle('card__like_active')
    }

    _clear() {
        this._card.closest('.card').remove()
    }

    generateCard() {
        this._getTemplate()
        this._setEventListeners()
        const image = this._card.querySelector('.card__image')
        image.src = this._link
        image.setAttribute('alt', `Не удалось загрузить изображение "${this._name}"`)
        this._card.querySelector('.card__title').textContent = this._name
        return this._card
    }
}