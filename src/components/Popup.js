export const popupProfile = document.querySelector('.popup_profile-edit')
export const popupNewCard = document.querySelector('.popup_new-card')
export const popupZoom = document.querySelector('.popup_zoom')

const closeButtonPopupProfile = popupProfile.querySelector('.popup__close')
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
const closeButtonPopupZoom = popupZoom.querySelector('.popup__close')

export const openPopup = function (somepopup) {
    somepopup.classList.add('popup_is-opened')
    document.addEventListener('keyup', closePopupByEscOrOverlay)
}

export const closePopup = function (somepopup) {
    somepopup.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', closePopupByEscOrOverlay)
}

export function closePopupByEscOrOverlay(e) {
    if (e.target.classList.contains('popup_is-opened') || (e.key == 'Escape')) {
        const openedPopup = document.querySelector('.popup_is-opened')
        if (openedPopup) {
            closePopup(openedPopup)
        }
    }
}

closeButtonPopupProfile.addEventListener('click', () => closePopup(popupProfile))
closeButtonPopupNewCard.addEventListener('click', () => closePopup(popupNewCard))
closeButtonPopupZoom.addEventListener('click', () => closePopup(popupZoom))

popupProfile.addEventListener('mousedown', closePopupByEscOrOverlay)
popupNewCard.addEventListener('mousedown', closePopupByEscOrOverlay)
popupZoom.addEventListener('mousedown', closePopupByEscOrOverlay)
// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// export class Popup {
//     constructor(popupSelector) {
//         this._popup = document.querySelector(popupSelector)
//     }

//     _handleEscClose() {
//         if (e.target.classList.contains('popup_is-opened') || (e.key == 'Escape')) {
//             const openedPopup = document.querySelector('.popup_is-opened')
//             if (openedPopup) {
//                 close(openedPopup)
//             }
//         }
//     }
    
//     _setEventListeners() {
//         const closeButton = this._popup.querySelector('.popup__close')
//         closeButton.addEventListener('click', () => close(this._popup))

//         this._popup.addEventListener('mousedown', _handleEscClose)
//     }

//     open() {
//         this._popup.classList.add('popup_is-opened')
//         document.addEventListener('keyup', _handleEscClose)
//     }

//     close() {
//         this._popup.classList.remove('popup_is-opened')
//         document.removeEventListener('keyup', _handleEscClose)
//     }

// }

// const popupProfileSelector = '.popup_profile-edit'
// const popup = new Popup(popupProfileSelector)
// popup.open()