// // import { Card } from './Card.js'
// import { FormValidator } from './FormValidator.js'
// // import { open, popupPhoto, close } from 
// import {initialCards} from './utils.js';
import { initialCards, config} from './utils.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

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


// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const profileValidation = new FormValidator(config, formPopupProfile)
const cardValidation = new FormValidator(config, formPopupNewCard)


//--------------------------------
function openPopup(somepopup) {
    somepopup.classList.add('popup_is-opened')
    cardValidation.enableValidation()
    profileValidation.enableValidation()
    document.addEventListener('keyup', closePopupEsc)
}

function closePopup(somepopup) {
    somepopup.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', closePopupEsc)
    cardValidation.resetFormState()
    profileValidation.resetFormState()
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
    if (event.target.classList.contains('popup_is-opened')) {
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



initialCards.forEach((item) => {
    const card = new Card(item, '.card-template')     // запишем карточку в переменную
    const cardElement = card.generateCard()    // ну и потом уже вставляешь её в разметку..
    cardsSection.prepend(cardElement)
});

function addNewCard() {
    // const item = {
    //     name: placeInput.value,
    //     link: linkInput.value
    // }
    const name = placeInput.value
    const link = linkInput.value
    const card = new Card({ name, link }, '.card-template')
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