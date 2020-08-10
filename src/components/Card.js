export default class Card {//создать клон
    constructor({ data, handleCardClick }, cardTemplateSelector) {
        this._name = data.name//просто заменила итем на дата
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
    
    generateCard() {
        this._card = this._getTemplate()
        this._setEventListener()
        this._card.querySelector('.card__title').textContent = this._name
        const cardPhoto = this._card.querySelector('.card__image')
        cardPhoto.src = this._link
        cardPhoto.setAttribute('alt', `Не удалось загрузить изображение "${this._name}"`)
        return this._card
    }
}

// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
// Эта функция должна открывать PopupWithImage при клике на карточку.
    // _handleCardClick() {
        // const popupZoom = document.querySelector('.popup_zoom');// не нужно чтоб работал
        // popupZoom.classList.add('popup_is-opened')

        // document.addEventListener('keyup', ()=>popupZoom.classList.remove('popup_is-opened'))

    //     this._zoomImage.setAttribute('src', `${this._link}`)
    //     this._zoomImage.setAttribute('alt', `Изображение ${this._name}`)
    //     this._zoomTitle.textContent = this._name
    // }