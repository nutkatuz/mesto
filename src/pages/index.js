import './index.css'
import {
    initialCards,
    config
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
//  devServer: {
//     host: 'http://127.0.0.1:5500/src/'
//   }, 
const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

const popupProfile = document.querySelector('.popup_profile-edit')
const profilePopupForm = popupProfile.querySelector('.popup__window')

const popupZoom = document.querySelector('.popup_zoom')

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
    {//указываем те же поля что и в конструкторе 
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
    nameInput.value = (userInfo.getUserInfo()).name
    jobInput.value = (userInfo.getUserInfo()).job
    profileValidation.resetFormState(popupProfile);
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
    cardValidation.resetFormState(popupNewCard);
    popupWithFormAdd.open();
}
addButton.addEventListener('click', () => showNewCardPopup())