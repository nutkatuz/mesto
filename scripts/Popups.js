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

export function closePopupByEscOrOverlay (e) {
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