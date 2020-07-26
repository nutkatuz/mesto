// // import { Card } from './Card.js'
// import { FormValidator } from './FormValidator.js'
// // import { open, popupPhoto, close } from 
// import {initialCards} from './utils.js';

//для профиля
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')
//для окна профиля
const popupProfile = document.querySelector('.popup_profile-edit')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const formPopupProfile = popupProfile.querySelector('.popup__window')
const closeButtonPopupProfile = popupProfile.querySelector('.popup__close')
//для карточки
const addButton = document.querySelector('.profile__add-button')
const cardsSection = document.querySelector('.places')
const cardTemplate = document.querySelector('.card-template')
//для окна карточки
const popupNewCard = document.querySelector('.popup_new-card')
const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')
const formPopupNewCard = popupNewCard.querySelector('.popup__window')
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
//для просмотра фото 
const popupZoom = document.querySelector('.popup_zoom')
const closeButtonPopupZoom = popupZoom.querySelector('.popup__close')
const zoomImage = document.querySelector('.zoom__image')
const zoomTitle = document.querySelector('.zoom__caption')


const config = {
    formSelector: '.popup__window',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    redSpanSelector: '.popup__error',
    labelSelector: '.popup__label',
    fieldsetSelector: '.popup__content'
  }
  
  // Создайте класс FormValidator, который настраивает валидацию полей формы:
  // принимает в конструктор объект настроек с селекторами и классами формы;
  // принимает вторым параметром элемент той формы, которая валидируется;
  class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._redSpanSelector = config.redSpanSelector;
        this._labelSelector = config.labelSelector;
        this._fieldsetSelector = config.fieldsetSelector;
    }
  
  // имеет приватные методы, которые обрабатывают форму:
    _showInputError (inputSelector, errorMessage) {
      const errorElement = inputSelector.closest(this._labelSelector).querySelector(this._redSpanSelector)
      inputSelector.classList.add(this._inputErrorClass)
      errorElement.textContent = errorMessage
      errorElement.classList.add(this._errorClass)
    }
    _hideInputError (inputSelector) {
      const errorElement = inputSelector.closest(this._labelSelector).querySelector(this._redSpanSelector)
      inputSelector.classList.remove(this._inputErrorClass)
      errorElement.classList.remove(this._errorClass)
    }

    _checkInputValidity (inputSelector) { //проверяют валидность поля
        if(!inputSelector.validity.valid) {
          this._showInputError(inputSelector, inputSelector.validationMessage);
        } else {
          this._hideInputError(inputSelector)
        }
    }
    _toggleButtonState() { 
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        if (hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', false)
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled')
        }
    }
    _hasInvalidInput() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      return this._inputList.some((inputSelector) => {
          return !inputSelector.validity.valid
      })
    }
    resetFormState () {
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
      this._inputList.forEach((inputSelector) => {
        this._hideInputError(inputSelector)
      })
    }
    _setEventListeners () {
      const _inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
      const submitButtonSelector = this._form.querySelector(this._submitButtonSelector)
     // this._toggleButtonState(_inputList, submitButtonSelector)
      this._inputList.forEach((inputSelector) => {
          inputSelector.addEventListener('input', () => {
            this._checkInputValidity(inputSelector)
            this._toggleButtonState()
          })
      })
    }
  // имеет один публичный метод enableValidation, который включает валидацию формы.
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }
        // enableValidation() {
        // const inputList = Array.from(document.querySelectorAll(this._formSelector))
        // inputList.forEach((formSelector) => {
        //     formSelector.addEventListener('submit', (evt) => {
        //         evt.preventDefault()
        //     })
        //     const fieldsetList = Array.from(formSelector.querySelectorAll(this._fieldsetSelector));
        //     fieldsetList.forEach((formSelector) => {
        //     setEventListeners(formSelector);
        //     })
        // })
        // }
  }
    // Для каждой проверяемой формы создайте экземпляр класса FormValidator.
    const profileValidation = new FormValidator(config, formPopupProfile)
    const cardValidation = new FormValidator(config, formPopupNewCard)




  //--------------------------------



function openPopup(somepopup) {
    somepopup.classList.add('popup_is-opened')
    profileValidation.resetFormState()
    document.addEventListener('keyup', closePopupEsc)
}

function closePopup(somepopup) {
    somepopup.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', closePopupEsc)
}

function closePopupEsc(event) {
    const KEYCODE_ESC = 27 //нет магических чисел
        if (event.keyCode !== KEYCODE_ESC) {
            return;
        }
    const openedPopup = document.querySelector('.popup_is-opened')
    if (openedPopup) {
        closePopup(openedPopup)
    }
}

//понятно, на что именно следует нажать, чтобы модальное окно закрылось
function overlayClose(event) {
    if (event.target.classList.contains('popup_is-opened')){
    const openedPopup = document.querySelector('.popup_is-opened')
        if (openedPopup) {
            closePopup(openedPopup)
        }
    }
}

const showEditPopup = function () {
    openPopup(popupProfile)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    const submitButtonSelector = popupProfile.querySelector('.popup__button')
    submitButtonSelector.classList.remove(config.inactiveButtonClass)
}

const showNewCardPopup = function () {
    openPopup(popupNewCard)
    formPopupNewCard.reset()
    //кнопку "сохранить" делаю белой при каждом открытии
    const submitButtonSelector = popupNewCard.querySelector('.popup__button')
    submitButtonSelector.classList.add(config.inactiveButtonClass)
}

const formSubmitHandlerProfile = function (event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupProfile)
}

function formSubmitHandlerNewCard(evt) {
    evt.preventDefault();
    addNewCard(placeInput.value, linkInput.value)
    // const name = placeInput.value
    // const link = linkInput.value
    // renderCard({ name, link })
    closePopup(popupNewCard)
}

class Card {
    // принимает в конструктор её данные и селектор её template-элемента;
    constructor(item, cardSelector) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;
    }
// содержит приватные методы, которые работают с разметкой, 
    _getTemplate() {
          const card = document
        //.querySelector('.card-template')
          .querySelector(this._cardSelector)
          .content
          .querySelector('.card')
          .cloneNode(true);
          return card;
      }

// содержит приватные методы, которые устанавливают слушателей событий;
    _setEventListener(){
        this._card.querySelector('.card__image').addEventListener('click', () => {
            this._showZoomPopup()
        })
        this._card.querySelector('.card__recycle-bin').addEventListener('click', () => {
            this._delCard()
        })
        this._card.querySelector('.card__like').addEventListener('click', () => {
            this._doLike()
        })
    }
// содержит приватные методы для каждого обработчика;
    _doLike () {
        this._card
        .querySelector('.card__like')
        .classList.toggle('card__like_active')
    }
    _delCard() {
        this._card
        .closest('.card').remove()
    }
    _showZoomPopup() {
        openPopup(popupZoom)
        zoomTitle.textContent = this._name
        zoomImage.setAttribute('src', `${this._link}`)
        zoomImage.setAttribute('alt', `Изображение ${this._name}`)
    }

// содержит 1 публичный метод, который возвращает наполненный элемент карточки.
    generateCard() {
        this._card = this._getTemplate();
        this._setEventListener();
        this._card.querySelector('.card__title').textContent = this._name
        this._card.querySelector('.card__image').src = this._link
        this._card.querySelector('.card__image').setAttribute('alt', `Не удалось загрузить изображение "${this._name}"`)
        
        return this._card;
    }
}

initialCards.forEach((item)  => {
    const card = new Card(item, '.card-template')     // запишем карточку в переменную
    const cardElement = card.generateCard()    // ну и потом уже вставляешь её в разметку..
    cardsSection.prepend(cardElement)
});

function addNewCard () {
    // const item = {
    //     name: placeInput.value,
    //     link: linkInput.value
    // }
    const name = placeInput.value
    const link = linkInput.value
    const card = new Card({name, link}, '.card-template')
    // запишем карточку в переменную
    const cardElement = card.generateCard();
    // ну и потом уже вставляешь её в разметку..
    cardsSection.prepend(cardElement)
}
// function addCard(nameArg, linkArg) {
//     const card = cardTemplate.content.cloneNode(true)
//     const recycleBin = card.querySelector('.card__recycle-bin')
//     const likeBtn = card.querySelector('.card__like')
//     const cardTitle = card.querySelector('.card__title')
//     const cardImg = card.querySelector('.card__image')
//     cardTitle.textContent = nameArg
//     cardImg.src = linkArg
//     cardImg.setAttribute('alt', `Не удалось загрузить изображение "${nameArg}"`)
//     cardImg.addEventListener('click', () => showZoomPopup(nameArg, linkArg))
//     recycleBin.addEventListener('click', (evt) => evt.target.closest('.card').remove())
//     likeBtn.addEventListener('click', doLike)
//     return card
// }

// function renderCard(item) {
//     const card = addCard(item.name, item.link)
//     cardsSection.prepend(card)
// }

// initialCards.forEach(function (item) {
//     addCard(item.name, item.link)
//     renderCard(item)
// })

editButton.addEventListener('click', showEditPopup)
addButton.addEventListener('click', showNewCardPopup)
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile)
popupZoom.addEventListener('mousedown', overlayClose)
popupProfile.addEventListener('mousedown', overlayClose)
popupNewCard.addEventListener('mousedown', overlayClose)
formPopupNewCard.addEventListener('submit', formSubmitHandlerNewCard)
closeButtonPopupProfile.addEventListener('click', () => closePopup(popupProfile))
closeButtonPopupZoom.addEventListener('click', () => closePopup(popupZoom))
closeButtonPopupNewCard.addEventListener('click', () => closePopup(popupNewCard))