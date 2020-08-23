export default class Card {
    constructor({
        data,
        handleCardClick
    }, cardTemplateSelector) {
        this._name = data.name
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

        this._card.querySelector('.card__recycle-bin').addEventListener('click', () => this._clear())
        this._card.querySelector('.card__like').addEventListener('click', () => this._like())
    }

    // _like() {
    //     this._card.querySelector('.card__like').classList.toggle('card__like_active')
    // }

    _clear() {
        this._card.closest('.card').remove()
    }

    generateCard() {
        this._getTemplate();
        this._setEventListeners();
        const image = this._card.querySelector('.card__image');
        image.src = this._link;
        image.setAttribute('alt', `Не удалось загрузить изображение "${this._name}" по ссылке URL "${this._link}"`);
        this._card.querySelector('.card__title').textContent = this._name;
        return this._card;
    }


}



// Свяжите класс Card (сщздфёт клоны) c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.


// const cardBin = document.querySelector('.card__recycle-bin')
// if (this._ownerId !== this._userId) {
//     this._element.querySelector('.card__recycle-bin').style.display = 'none';
//   }
// if (this._likes.find(item => item._id === this._userId)) {
//     this._element.querySelector('.card__like').classList.toggle('card__like_active');
//   };
//   return this._element;