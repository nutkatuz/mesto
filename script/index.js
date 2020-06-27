//для профиля
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let editButton = document.querySelector('.profile__edit-button')
//для окна редактирования профиля
let popup = document.querySelector('.popup')
let popupProfile = document.querySelector('.popup_profile-edit')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_about')
let form = document.querySelector('.popup__container')
let closeButtonPopupProfile = popupProfile.querySelector('.popup__close')
//для карточки
let addButton = document.querySelector('.profile__add-button')
//для окна добавления новой карточки
let popupNewCard = document.querySelector('.popup_new-card')
let closeButtonOfCard = popupNewCard.querySelector('.popup__close')
let placeNameInput = document.querySelector('.popup__input_place-name')
let imageURLInput = document.querySelector('.popup__input_image_url')
let closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
//для просмотра фото (без кнопки-крестика)
let popupZoom = document.querySelector('.popup_zoom');
let zoomImage = document.querySelector('.zoom__image');
let zoomTitle = document.querySelector('.zoom__caption');
//общие






//открыть модальное окно для редактирования, с копированием страничных в инпуты.
// когда окно нужно закрыть, нам не нужно копировать значения в инпуты, 
// т.е. без проверки мы делаем ненужные действия. Но здесь я только лишь открываю!!
let toggle = function (popupProfile) {
    popupProfile.classList.toggle('popup_is-opened')
}

let showPopup = function () {
    toggle(popupProfile)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
//записать введенные значения на страницу и закрыть
let formSubmitHandler = function (event) { 
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggle (popupProfile)
}
//закрыть без сохранения по клику НЕ на модальное окно
let overlayClick = function (event) { 
    if (event.target != event.currentTarget) { return } 
    toggle(popupProfile)
} 

closeButtonPopupProfile.addEventListener('click', function(){
    toggle(popupProfile)
})
editButton.addEventListener('click', showPopup)
form.addEventListener('submit', formSubmitHandler)
popup.addEventListener('click', overlayClick)

//Сделайте так, чтобы форма открывалась нажатием на кнопку «+» и закрывалась кликом на крестик:
let showPopupNewCard = function () {
    toggle(popupNewCard)
}
addButton.addEventListener('click', function() {
    showPopupNewCard(popupNewCard)
})
closeButtonPopupNewCard.addEventListener('click', function(){
    toggle(popupNewCard)
})
