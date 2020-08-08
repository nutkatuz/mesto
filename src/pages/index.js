import { initialCards, configCard, config } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
// import PopupWithForm from '../components/PopupWithForm.js';

const addButton = document.querySelector('.profile__add-button')
const cardsSection = document.querySelector('.places')

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

const popupProfile = document.querySelector('.popup_profile-edit')
const profilePopupForm = popupProfile.querySelector('.popup__window')

const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')

const popupNewCard = document.querySelector('.popup_new-card')
const newCardPopupForm = popupNewCard.querySelector('.popup__window')
const cardTemplateSelector = '.card-template'
const containerSelector = '.places'

const profileValidation = new FormValidator(config, profilePopupForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(config, newCardPopupForm)
cardValidation.enableValidation()
//

//Свяжите класс Card c PopupWithImage
// const handleCardClick =function(popupSel){
//     popup = document.querySelector(popupSel)
//     popup.classList.add('popup_is-opened')
//     // document.addEventListener('keyup', closePopupByEscOrOverlay)
// document.querySelector('.zoom__image').setAttribute('src', `${this._link}`)
// document.querySelector('.zoom__image').setAttribute('alt', `Изображение ${this._name}`)
// document.querySelector('.zoom__caption').textContent = this._name
// }
const popupZoomDOM = document.querySelector('.popup__zoom')

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {//Эта функция должна открывать PopupWithImage при клике на карточку
                const popupZoom = new PopupWithImage('.popup__zoom')//стало
                popupZoom.open(item);
            }
        },
            cardTemplateSelector,
            // configCard
        );
        const cardElement = card.generateCard();
        cardList.addItem(cardElement)
    }
},
    containerSelector);
cardList.renderItems();// до этого момента правильно

const addItem = function (item) {
    const card = new Card({
        data: item,
        handleCardClick: (popupZoom) => {//Эта функция должна открывать PopupWithImage при клике на карточку
            popupZoom.open(item);//было
        }
    },
        cardTemplateSelector,
        // configCard
    );
    const cardElement = card.generateCard()
    return cardElement
}

// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
const renderer = function () {
    const name = placeInput.value
    const link = linkInput.value
    const cardElement = addItem({ name, link })
    cardsSection.prepend(cardElement)
}

//
const showEditPopup = function () {
    const popup = new Popup('.popup_profile-edit')
    popup.open()
    popup.setEventListeners()

    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    const submitButtonSelector = popupProfile.querySelector('.popup__button')
    submitButtonSelector.classList.remove(config.inactiveButtonClass)
    profileValidation.resetFormState()
}

const showNewCardPopup = function () {
    const popup = new Popup('.popup_new-card')
    popup.open()
    popup.setEventListeners()

    newCardPopupForm.reset()
    const submitButtonSelector = popupNewCard.querySelector('.popup__button')
    submitButtonSelector.classList.add(config.inactiveButtonClass)
    cardValidation.resetFormState()
}

const formSubmitHandlerProfile = function (evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value

    const popup = new Popup('.popup_profile-edit')
    popup.close()
    // closePopup(popupProfile)
}

const formSubmitHandlerNewCard = function (evt) {
    evt.preventDefault();
    renderer(placeInput.value, linkInput.value)

    const popup = new Popup('.popup_new-card')
    popup.close()
    // closePopup(popupNewCard)
}

editButton.addEventListener('click', showEditPopup)
addButton.addEventListener('click', showNewCardPopup)
profilePopupForm.addEventListener('submit', formSubmitHandlerProfile)
newCardPopupForm.addEventListener('submit', formSubmitHandlerNewCard)
