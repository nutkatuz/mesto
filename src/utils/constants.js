
//Привет! Задайте данные здесь!
//1.//import murmanskbarincevo from './images/places/murmanskbarincevo.jpg';
export const initialCards = [
    {
        name: 'Якутия',
        link: 'https://cs8.pikabu.ru/post_img/2016/08/06/9/1470497053165232138.jpg'
    },
    {
        name: 'Мурманск',
        link: 'https://static.wixstatic.com/media/cd203f_d29c0159138b43b4a47fd0199a83f49c~mv2_d_2560_1708_s_2.jpg'
    },//murmanskbarincevo
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Озеро Эльтон',
        link: 'https://russia.travel/upload/resize/376791/1280_1280/948138.jpg'
    },
    {
        name: 'Марсианское озеро',
        link: 'https://russia.travel/upload/uf/2af/2af7df5f319d0c0877e8aa0d0d0d8f79.jpg'
    },
    {
        name: 'Плато Караби-Яйла',
        link: 'https://russia.travel/upload/resize/376793/1280_1280/948142.jpg'
    },
]

//2.
export const config = { //объект настроек с селекторами и классами формы
    // formSelector: '.popup__window',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    redSpanSelector: '.popup__error',
    labelSelector: '.popup__label',
    fieldsetSelector: '.popup__content',
}

export const configCard = {//убрала !
    zoomImageSelector: '.zoom__image',
    zoomTitleSelector: '.zoom__caption',
    popupSelector: '.popup_zoom'
}