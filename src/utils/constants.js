//Привет! Задайте данные здесь!

import russiaImage from '../images/places/08s.jpg';
import eltonImage from '../images/places/elton.jpg';
import exhibitionImage from '../images/places/exhibition.jpg';
import kamchatkaImage from '../images/places/kamchatka.jpg';
import marsImage from '../images/places/mars.jpg';
import murmanskImage from '../images/places/murmansk.jpg';
import murmanskbarincevoImage from '../images/places/murmanskbarincevo.jpg';
import platoImage from '../images/places/plato.jpg';
import vkamchatkaImage from '../images/places/vkamchatka.jpg';

export const initialCards = [
    {
        name: 'Россия',
        link: russiaImage
    },
    {
        name: 'Озеро Эльтон',
        link: eltonImage
    },
    {
        name: 'Якутия',
        link: exhibitionImage
    },
    {
        name: 'Камчатка',
        link: kamchatkaImage
    },
    {
        name: 'Марсианское озеро',
        link: marsImage
    },
    {
        name: 'Байкал',
        link: murmanskImage
    },
    {
        name: 'Баринцево море',
        link: murmanskbarincevoImage
    },
    {
        name: 'Плато Караби-Яйла',
        link: platoImage
    },
    {
        name: 'Вулканы камчатки',
        link: vkamchatkaImage
    },
]

//2. Заполните объект настроек с селекторами и классами форм
export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    redSpanSelector: '.popup__error',
    labelSelector: '.popup__label',
    fieldsetSelector: '.popup__content',
}

//3. Введите селекторы поля имени и профессии на странице
export const profileNameSelector = '.profile__name'
export const profileJobSelector = '.profile__job'

// 4. Заполнить селекторы
export const containerSelector = '.places'

export const addButton = document.querySelector('.profile__add-button')
export const editButton = document.querySelector('.profile__edit-button')
export const popupProfile = document.querySelector('.popup_profile-edit')
export const popupZoom = document.querySelector('.popup_zoom')
export const popupNewCard = document.querySelector('.popup_new-card')
export const popupUpdateAvatar = document.querySelector('.popup_update-avatar')
export const popupConfirm = document.querySelector('.popup_confirm')

export const cardTemplateSelector = '.card-template'