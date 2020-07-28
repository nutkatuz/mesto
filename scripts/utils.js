export const initialCards = [
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Березники',
        link: './images/places/zimniy.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Мурманск',
        link: './images/places/murmanskbarincevo.jpg'
    },
    {
        name: 'Якутия',
        link: './images/places/yakutiya.jpg'
    }
]

export const config = { //объект настроек с селекторами и классами формы
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

export const openPopup = function (somepopup) {
    somepopup.classList.add('popup_is-opened')
    document.addEventListener('keyup', closePopupEsc)
}

export const closePopup = function (somepopup) {
    somepopup.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', closePopupEsc)
}

export function closePopupEsc (event) {
    const KEYCODE_ESC = 27 //нет магических чисел
    if (event.keyCode !== KEYCODE_ESC) {
        return;
    }
    const openedPopup = document.querySelector('.popup_is-opened')
    if (openedPopup) {
        closePopup(openedPopup)
    }
}
    // Константы, относящиеся к размeтке окна большого фото лучше не определять в классе Card, 
    // чтобы не делать его зависимы от конкретной размeтки, 
    // чтобы методы этого класса можно было использовать в любом проекте при любой размeтке. 
    // Селекторы элементов окна большого фото лучше передавать в параметр конструктора класса Card 
    // как свойства объекта-конфига для окна большого фото. 
    // Этот объекта-конфиг можно определить в index.js
export const configCard = { //объект настроек с селекторами и классами Card
    zoomImageSelector: '.zoom__image',
    zoomTitleSelector: '.zoom__caption'
}