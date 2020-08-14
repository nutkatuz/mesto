import './index.css'
import {
    initialCards,
    config,
    profileNameSelector,
    profileJobSelector,
    containerSelector
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')

//убрала из разметки. надоело что там лишние данные
const i = document.querySelector(profileNameSelector)
i.textContent = 'Жак-Ив Кусто'
const ii = document.querySelector(profileJobSelector)
ii.textContent = 'Исследователь океана'

const popupProfile = document.querySelector('.popup_profile-edit')
const profilePopupForm = popupProfile.querySelector('.popup__form')

const popupZoom = document.querySelector('.popup_zoom')
const popupNewCard = document.querySelector('.popup_new-card')
const newCardPopupForm = popupNewCard.querySelector('.popup__form')
const cardTemplateSelector = '.card-template'


const profileValidation = new FormValidator(config, profilePopupForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(config, newCardPopupForm)
cardValidation.enableValidation()

const userInfo = new UserInfo( //объявление
    {//присваивание ключей к тем же св-вам, что и в конструкторе 
        profileNameSelector: profileNameSelector,
        profileJobSelector: profileJobSelector
    }
);

const popupWithImage = new PopupWithImage(popupZoom)

const popupWithFormEdit = new PopupWithForm(popupProfile, {
    handleSubmit: (item) => {
        userInfo.setUserInfo(item);
    }
});

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const showEditPopup = () => {
    profileValidation.resetFormState(popupProfile);
    profileValidation.ableBtn(popupProfile);
    popupWithFormEdit.open();
    const user = userInfo.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.job;  
    //   popupWithFormEdit.open() почему-то значения из разметки
}
editButton.addEventListener('click', () => showEditPopup())


const popupWithFormAdd = new PopupWithForm(
    popupNewCard, {
    handleSubmit: (item) => {
        const card = new Card({ data: item, handleCardClick: () => {popupWithImage.open(item)} }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItem(myCard);
    }
});

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({ data: item, handleCardClick: () => {popupWithImage.open(item)} }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItems(myCard);
    }
}, containerSelector);
section.renderItems();//запускаем колбэк


const showNewCardPopup = () => {
    cardValidation.resetFormState(popupNewCard);
    cardValidation.disableBtn(popupNewCard);
    popupWithFormAdd.open();

};

addButton.addEventListener('click', () => showNewCardPopup());
popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithImage.setEventListeners();