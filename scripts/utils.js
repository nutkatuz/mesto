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


export const config = {
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