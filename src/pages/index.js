import {
    initialCards,
    configCard,
    config
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const addButton = document.querySelector('.profile__add-button')


const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

const popupProfile = document.querySelector('.popup_profile-edit')
const profilePopupForm = popupProfile.querySelector('.popup__window')

const popupZoom = document.querySelector('.popup_zoom')
const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')

const popupNewCard = document.querySelector('.popup_new-card')
const newCardPopupForm = popupNewCard.querySelector('.popup__window')
const cardTemplateSelector = '.card-template'
const containerSelector = '.places'
const cardsSection = document.querySelector('.places')

const profileValidation = new FormValidator(config, profilePopupForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(config, newCardPopupForm)
cardValidation.enableValidation()

const userInfo = new UserInfo( //объявление
    {
        profileNameSelector: '.profile__name',
        profileJobSelector: '.profile__job'
    }
);

const popupWithImage = new PopupWithImage(popupZoom)

const popupWithFormEdit = new PopupWithForm(popupProfile, {
    handleSubmit: (item) => {
        userInfo.setUserInfo(item);
        popupWithFormEdit.close();
    }
});

const showEditPopup = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.nameInput
    jobInput.value = userData.jobInput

    // const submitButton = popupProfile.querySelector('.popup__button')
    // profileValidation.toggleButtonState(false, submitButton);
    // profileValidation.clearError(popupProfile);

    popupWithFormEdit.open()
}
editButton.addEventListener('click', () => showEditPopup())


const popupWithFormAdd = new PopupWithForm(popupNewCard, {//ошибка
    handleSubmit: (item) => {
        const card = new Card({ //adding new card
            data: item,
            handleCardClick: () => {// - Эта функция должна открывать PopupWithImage при клике на карточку.
                popupWithImage.open(item);
            }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItem(myCard);
        popupWithFormAdd.close();
    }
});

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {// - Эта функция должна открывать PopupWithImage при клике на карточку.
                popupWithImage.open(item);
            }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItem(myCard);
        popupWithFormAdd.close();
    }
}, cardsSection)
section.renderItems()


const showNewCardPopup = () => {

    // const submitButton = popupNewCard.querySelector('.popup__button')
    // cardValidation.toggleButtonState(true, submitButton);
    // cardValidation.clearError(popupNewCard);

    popupWithFormAdd.open();
}
addButton.addEventListener('click', () => showNewCardPopup())


