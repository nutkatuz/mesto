//для профиля
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')
//для окна редактирования профиля
const popupProfile = document.querySelector('.popup_profile-edit')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const formPopupProfile = popupProfile.querySelector('.popup__container')
const closeButtonPopupProfile = popupProfile.querySelector('.popup__close')
//для карточки
const addButton = document.querySelector('.profile__add-button')
//для окна добавления новой карточки
const popupNewCard = document.querySelector('.popup_new-card')
const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')
const formPopupNewCard = popupNewCard.querySelector('.popup__container')
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
//для просмотра фото 
const popupZoom = document.querySelector('.popup_zoom')
const closeButtonPopupZoom = popupZoom.querySelector('.popup__close')
const zoomImage = document.querySelector('.zoom__image')
const zoomTitle = document.querySelector('.zoom__caption')
const cardsSection = document.querySelector('.places')
const cardTemplate = document.querySelector('#card-template')

//открыть модальное окно для редактирования, с копированием страничных в инпуты.
// когда окно нужно закрыть, нам не нужно копировать значения в инпуты, 
// т.е. без проверки мы делаем ненужные действия. Но здесь я только лишь открываю
const togglePopup = (somepopup) => somepopup.classList.toggle('popup_is-opened')
const showEditPopup = function () {
    togglePopup(popupProfile)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}
//записать введенные значения на страницу и закрыть
const formSubmitHandlerProfile = function (event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    togglePopup(popupProfile)
}
//Сделайте так, чтобы форма открывалась нажатием на кнопку «+» и закрывалась кликом на крестик:
addButton.addEventListener('click', function () {
    togglePopup(popupNewCard)
    placeInput.value = ''
    linkInput.value = ''
})
//пусть JS загрузит 6 карточек из коробки:
const initialCards = [
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
];
// Для отображения изначальных карточек и создания новых должна быть использована одна функция, 
// которая аргументом принимает название и ссылку.
// Метод addCard должен выполнять функцию создания новой карточки и  добавления слушателей. 
// Он должен возвращать с помощью return готовую карточку. 
// Добавление ее в разметку должно происходить в другом месте, откуда она вызывается.
function addCard(prop1, prop2) {
    const card = cardTemplate.content.cloneNode(true)
    card.querySelector('.card__title').textContent = prop1
    card.querySelector('.card__image').src = prop2
    card.querySelector('.card__recycle-bin').addEventListener('click', (evt) => evt.target.closest('.card').remove())
    card.querySelector('.card__like').addEventListener('click', (evt) => evt.target.classList.toggle('card__like_active'))
    card.querySelector('.card__image').addEventListener('click', function (evt) {
        togglePopup(popupZoom)
        zoomImage.setAttribute('src', evt.target.src)
        zoomTitle.textContent = prop1
        zoomImage.setAttribute('alt', prop1)
    })
    cardsSection.prepend(card)
    return card
}
//он не может прочитать свойства name и link, поэтому надо через колбэк-функцию метода их вызвать
initialCards.forEach(item => addCard(item.name, item.link))
//Добавление карточки в разметку должно происходить в другом месте, откуда она вызывается.
function formSubmitHandlerNewCard(evt) {
    evt.preventDefault();
    addCard(placeInput.value, linkInput.value)
    togglePopup(popupNewCard)
}
//закрыть без сохранения по клику НЕ на модальное окно//нас уже на вебинаре научили, не удалю, моё :D ещё и добавила :D
const overlayClosePopupProfile = function (event) {
    if (event.target != event.currentTarget) { return }
    togglePopup(popupProfile)
}
const overlayClosePopupZoom = function (event) {
    if (event.target != event.currentTarget) { return }
    togglePopup(popupZoom)
}
const overlayClosePopupNewCard = function (event) {
    if (event.target != event.currentTarget) { return }
    togglePopup(popupNewCard)
}
//Слушатели глобальные
closeButtonPopupProfile.addEventListener('click', () => togglePopup(popupProfile))
editButton.addEventListener('click', showEditPopup)
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile)
popupZoom.addEventListener('click', overlayClosePopupZoom)
popupProfile.addEventListener('click', overlayClosePopupProfile)
popupNewCard.addEventListener('click', overlayClosePopupNewCard)
formPopupNewCard.addEventListener('submit', formSubmitHandlerNewCard)
closeButtonPopupZoom.addEventListener('click', () => togglePopup(popupZoom))
closeButtonPopupNewCard.addEventListener('click', () => togglePopup(popupNewCard))