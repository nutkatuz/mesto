export const initialCards = [
    {
        name: 'Якутия',
        link: './images/places/yakutiya.jpg'
    },
    {
        name: 'Мурманск',
        link: './images/places/murmanskbarincevo.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Березники',
        link: './images/places/zimniy.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    }
]

export const configCard = {
    zoomImageSelector: '.zoom__image',
    zoomTitleSelector: '.zoom__caption'
}

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
