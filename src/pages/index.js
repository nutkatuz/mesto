import './index.css'
import {
    initialCards,
    config,
    profileNameSelector,
    profileJobSelector,
    containerSelector,
    addButton,
    editButton,
    popupZoom,
    popupNewCard,
    popupProfile,
    cardTemplateSelector,
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const newCardPopupForm = popupNewCard.querySelector('.popup__form')
const profilePopupForm = popupProfile.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

//убрала из разметки. надоело что там лишние данные
const i = document.querySelector(profileNameSelector)
i.textContent = 'Жак-Ив Кусто'
const ii = document.querySelector(profileJobSelector)
ii.textContent = 'Исследователь океана'

const profileValidation = new FormValidator(config, profilePopupForm);
profileValidation.enableValidation();

const cardValidation = new FormValidator(config, newCardPopupForm);
cardValidation.enableValidation();

const userInfo = new UserInfo( //объявление//присваивание ключей к тем же св-вам, что и в конструкторе 
    {
        profileNameSelector: profileNameSelector,
        profileJobSelector: profileJobSelector
    }
);

const popupWithImage = new PopupWithImage(popupZoom);

const popupWithFormEdit = new PopupWithForm(popupProfile, {
    handleSubmit: (item) => {
        userInfo.setUserInfo(item)
    }
});

const showEditPopup = () => {
    profileValidation.resetFormState(popupProfile);
    profileValidation.ableBtn(popupProfile);
    popupWithFormEdit.open();// вначале ресетить форму надо
    const user = userInfo.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.job;    //а потом уже  значения из разметки.
}

const popupWithFormAdd = new PopupWithForm(
    popupNewCard, {
        handleSubmit: (item) => {
            const card = new Card({
                data: item,
                handleCardClick: () => {
                    popupWithImage.open(item)
                }
            }, cardTemplateSelector);
            const myCard = card.generateCard();
            section.addItem(myCard);
        }
    });

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupWithImage.open(item)
            }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItems(myCard);
    }
}, containerSelector);
section.renderItems(); //запускаем колбэк


const showNewCardPopup = () => {
    cardValidation.resetFormState(popupNewCard);
    cardValidation.disableBtn(popupNewCard);
    popupWithFormAdd.open();
};

popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithImage.setEventListeners();
editButton.addEventListener('click', () => showEditPopup());
addButton.addEventListener('click', () => showNewCardPopup())