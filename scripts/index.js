//для профиля
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')
//для окна редактирования
const popupProfile = document.querySelector('.popup_profile-edit')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const formPopupProfile = popupProfile.querySelector('.popup__form')
const closeButtonPopupProfile = popupProfile.querySelector('.popup__close')
//для карточки
const addButton = document.querySelector('.profile__add-button')
const cardsSection = document.querySelector('.places')
const cardTemplate = document.querySelector('#card-template')
//для окна добавления новой карточки
const popupNewCard = document.querySelector('.popup_new-card')
const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')
const formPopupNewCard = popupNewCard.querySelector('.popup__form')
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
//для просмотра фото 
const popupZoom = document.querySelector('.popup_zoom')
const closeButtonPopupZoom = popupZoom.querySelector('.popup__close')
const zoomImage = document.querySelector('.zoom__image')
const zoomTitle = document.querySelector('.zoom__caption')

const togglePopup = function (somepopup) {
    somepopup.classList.toggle('popup_is-opened')
    resetFormState(somepopup, config)
}

// const openPopup = somepopup => {
//     somepopup.classList.add('popup_is-opened')
//     resetFormState(somepopup, config)
// }

function closePopupEsc(event) {
        if (event.keyCode !== 27) {
            return;
        }
    const openedPopup = document.querySelector('.popup_is-opened')
    if (openedPopup) {
        togglePopup(openedPopup)
    }
}


const showEditPopup = function () {
    togglePopup(popupProfile)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

const formSubmitHandlerProfile = function (event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    togglePopup(popupProfile)
}

const showNewCardPopup = function () {
    togglePopup(popupNewCard)
    formPopupNewCard.reset()
    resetFormState(popupNewCard, config)
    //деактивирую кнопку "сохранить"
    const submitButtonSelector = popupNewCard.querySelector('.popup__button')
    submitButtonSelector.setAttribute('disabled', false)
}

const doLike = (evt) => evt.target.classList.toggle('card__like_active')

function addCard(nameArg, linkArg) {
    const card = cardTemplate.content.cloneNode(true)
    const recycleBin = card.querySelector('.card__recycle-bin')
    const likeBtn = card.querySelector('.card__like')
    const cardTitle = card.querySelector('.card__title')
    const cardImg = card.querySelector('.card__image')
    cardTitle.textContent = nameArg
    cardImg.src = linkArg
    cardImg.setAttribute('alt', `Изображение ${nameArg}`)
    cardImg.addEventListener('click', () => showZoomPopup(nameArg, linkArg))
    recycleBin.addEventListener('click', (evt) => evt.target.closest('.card').remove())
    likeBtn.addEventListener('click', doLike)
    return card
}

function renderCard(item) {
    const card = addCard(item.name, item.link)
    cardsSection.prepend(card)
}

initialCards.forEach(function (item) {
    addCard(item.name, item.link)
    renderCard(item)
})

function formSubmitHandlerNewCard(evt) {
    evt.preventDefault();
    addCard(placeInput.value, linkInput.value)
    const name = placeInput.value
    const link = linkInput.value
    renderCard({ name, link })
    togglePopup(popupNewCard)
}

function showZoomPopup(nameArgument, linkArgument) {
    togglePopup(popupZoom)
    zoomTitle.textContent = nameArgument
    zoomImage.setAttribute('src', `${linkArgument}`)
    zoomImage.setAttribute('alt', `Изображение ${nameArgument}`)
}

//понятно, на что именно следует нажать, чтобы модальное окно закрылось
const overlayClosePopupProfile = function (event) {
    //if (event.target != event.currentTarget) { return }
    if (event.target.classList.contains('popup'))
        togglePopup(popupProfile)
}

const overlayClosePopupZoom = function (event) {
    if (event.target.classList.contains('popup'))
        togglePopup(popupZoom)
}

const overlayClosePopupNewCard = function (event) {
    if (event.target.classList.contains('popup'))
        togglePopup(popupNewCard)
}


closeButtonPopupProfile.addEventListener('click', () => togglePopup(popupProfile))
editButton.addEventListener('click', showEditPopup)
addButton.addEventListener('click', showNewCardPopup)
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile)
popupZoom.addEventListener('mousedown', overlayClosePopupZoom)
popupProfile.addEventListener('mousedown', overlayClosePopupProfile)
popupNewCard.addEventListener('mousedown', overlayClosePopupNewCard)
formPopupNewCard.addEventListener('submit', formSubmitHandlerNewCard)
closeButtonPopupZoom.addEventListener('click', () => togglePopup(popupZoom))
closeButtonPopupNewCard.addEventListener('click', () => togglePopup(popupNewCard))
document.addEventListener('keydown', closePopupEsc)