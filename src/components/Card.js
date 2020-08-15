export default class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteClick,
    handleAddLike,
    handleDeleteLike,
    templateSelector,
    userId
  }) {
    this._name = data.name
    this._link = data.link
    this._cardId = data._id
    this._ownerId = data.owner._id
    this._likes = data.likes

    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick

    this._handleAddLike = handleAddLike
    this._handleDeleteLike = handleDeleteLike
    this._templateSelector = templateSelector
    this._userId = userId
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)

    this._card = card //это document-fragment из разметки
    return this._card
  }

  _handleLikeClick() {
    if (this._card.querySelector('.card__like').classList.contains('card__like_active')) {
      this._handleDeleteLike(this._cardId)
      this._card.querySelector('.card__like-count').textContent = this._likes.length -= 1
    } else {
      this._handleAddLike(this._cardId)
      this._card.querySelector('.card__like-count').textContent = this._likes.length += 1
    }
    this._card.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _setEventListeners() {
    this._card.querySelector('.card__image').addEventListener('mouseup', () => this._handleCardClick())
    this._card.querySelector('.card__recycle-bin').addEventListener('mouseup', () => this._handleDeleteClick())
    this._card.querySelector('.card__like').addEventListener('mouseup', () => this._handleLikeClick())
  }

  removeCard() {
    this._card.remove()
    this._card = null
  }

  generateCard() {
    this._getTemplate()
    this._setEventListeners()

    // to set name and image to card
    const image = this._card.querySelector('.card__image')
    image.src = this._link
    image.setAttribute('alt', `Не удалось загрузить изображение "${this._name}" по ссылке URL "${this._link}"`)
    this._card.querySelector('.card__title').textContent = this._name

    //to set likes to card
    this._card.querySelector('.card__like-count').textContent = this._likes.length

    //to set black likes or white to card
    if (this._likes.find(like => like._id === this._userId)) {
      this._card.querySelector('.card__like').classList.toggle('card__like_active')
    }

    //to set deleteIcon visible or not to card
    if (this._ownerId !== this._userId) {
      this._card.querySelector('.card__recycle-bin').style.display = 'none'
    }

    return this._card
  }
}