import { initialCards, configCard, config, openPopup, closePopup } from './utils.js'
import { Card, popupZoom } from './Card.js'
import { FormValidator } from './FormValidator.js'

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')

const popupProfile = document.querySelector('.popup_profile-edit')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const profilePopupForm = popupProfile.querySelector('.popup__window')
const closeButtonPopupProfile = popupProfile.querySelector('.popup__close')

const addButton = document.querySelector('.profile__add-button')
const cardsSection = document.querySelector('.places')

const popupNewCard = document.querySelector('.popup_new-card')
const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')
const newCardPopupForm = popupNewCard.querySelector('.popup__window')
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
const closeButtonPopupZoom = popupZoom.querySelector('.popup__close')
const cardTemplateSelector = '.card-template'

const profileValidation = new FormValidator(config, profilePopupForm)
const cardValidation = new FormValidator(config, newCardPopupForm)

cardValidation.enableValidation()
profileValidation.enableValidation()

const cardsRender = function (item) {
    const card = new Card(item, cardTemplateSelector, configCard)
    const cardElement = card.generateCard()
    return cardElement
}

const firstCardsSectionAutoFill = function () {
    initialCards.forEach((item) => {
    const cardElement = cardsRender(item)
    cardsSection.append(cardElement)
    })
}
firstCardsSectionAutoFill()

const addNewCard = function () {
    const name = placeInput.value
    const link = linkInput.value
    const cardElement = cardsRender({ name, link })
    cardsSection.prepend(cardElement)
}

const showEditPopup = function () {
    openPopup(popupProfile)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    const submitButtonSelector = popupProfile.querySelector('.popup__button')
    submitButtonSelector.classList.remove(config.inactiveButtonClass)
    profileValidation.resetFormState()
}

const showNewCardPopup = function () {
    openPopup(popupNewCard)
    newCardPopupForm.reset()
    const submitButtonSelector = popupNewCard.querySelector('.popup__button')
    submitButtonSelector.classList.add(config.inactiveButtonClass)
    cardValidation.resetFormState()
}

const formSubmitHandlerProfile = function (evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupProfile)
}

const formSubmitHandlerNewCard = function (evt) {
    evt.preventDefault();
    addNewCard(placeInput.value, linkInput.value)
    closePopup(popupNewCard)
}

const overlayClose = function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        const openedPopup = document.querySelector('.popup_is-opened')
        if (openedPopup) {
            closePopup(openedPopup)
        }
    }
}

editButton.addEventListener('click', showEditPopup)
addButton.addEventListener('click', showNewCardPopup)
profilePopupForm.addEventListener('submit', formSubmitHandlerProfile)
newCardPopupForm.addEventListener('submit', formSubmitHandlerNewCard)

popupZoom.addEventListener('mousedown', overlayClose)
popupProfile.addEventListener('mousedown', overlayClose)
popupNewCard.addEventListener('mousedown', overlayClose)
closeButtonPopupProfile.addEventListener('click', () => closePopup(popupProfile))
closeButtonPopupZoom.addEventListener('click', () => closePopup(popupZoom))
closeButtonPopupNewCard.addEventListener('click', () => closePopup(popupNewCard))