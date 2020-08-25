export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, templateSelector, handleAddLike, handleDeleteLike, userId }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;

    this._likes = data.likes;
    this._addLike = handleAddLike;
    this._removeLike = handleDeleteLike;
    
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)

    this._card = card; //это document-fragment из разметки
    return this._card;
  }

  _handleLikeClick() {
    this._likeBtn = this._card.querySelector('.card__like');
    if (this._likeBtn.classList.contains('card__like_active')) {
      this._removeLike(this._cardId);
      this._card.querySelector('.card__like-count').textContent = this._likes.length -= 1;
    } else {
      this._addLike(this._cardId);
      this._card.querySelector('.card__like-count').textContent = this._likes.length += 1;
    };
    this._likeBtn.classList.toggle('card__like_active');
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('click', () => this._handleCardClick())
    this._card.querySelector('.card__recycle-bin').addEventListener('click', () => this._handleDeleteClick())
    this._card.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick())
  }

  removeCard() {
    this._card.remove()
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    // to set name and image to card
    const image = this._card.querySelector('.card__image');
    image.src = this._link;
    image.setAttribute('alt', `Не удалось загрузить изображение "${this._name}" по ссылке URL "${this._link}"`);
    this._card.querySelector('.card__title').textContent = this._name;

    //to set likes to card
    this._card.querySelector('.card__like-count').textContent = this._likes.length;

    //to set black likes or white to card
    if (this._likes.find(item => item._id === this._userId)) {
      this._card.querySelector('.card__like').classList.toggle('card__like_active');
    };

    //to set deleteIcon visible or not to card
    if (this._ownerId !== this._userId) {
      this._card.querySelector('.card__recycle-bin').style.display = 'none';
    }

    return this._card;
  }
}


// Свяжите класс Card (сoздфёт клоны) c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.