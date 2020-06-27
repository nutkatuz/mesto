//для профиля
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let popupEditButton = document.querySelector('.profile__edit-button')
//для окна редактирования профиля
let popup = document.querySelector('.popup_profile-edit')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_about')
let form = document.querySelector('.popup__container')
//для карточки

//для окна добавления новой карточки
let popupNewCard = document.querySelector('.popup_new-card')
let closeButtonOfCard = popupNewCard.querySelector('.popup__close')
let placeNameInput = document.querySelector('.popup__input_place-name')
let imageURLInput = document.querySelector('.popup__input_image_url')
//для просмотра фото (без кнопки-крестика)
let popupZoom = document.querySelector('.popup_zoom');
let zoomImage = document.querySelector('.zoom__image');
let zoomTitle = document.querySelector('.zoom__caption');

//общие
let closeButton = document.querySelector('.popup__close')





//открыть модальное окно для редактирования, с копированием страничных в инпуты.
// когда окно нужно закрыть, нам не нужно копировать значения в инпуты, 
// т.е. без проверки мы делаем ненужные действия. Но здесь я только лишь открываю!!
let toggle = function () {
    popup.classList.toggle('popup_is-opened')
}

let showPopup = function () {
    toggle()
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
//записать введенные значения на страницу и закрыть
let formSubmitHandler = function (event) { 
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggle ()
}
//закрыть без сохранения по клику НЕ на модальное окно
let overlayClick = function (event) { 
    if (event.target != event.currentTarget) { return } 
    toggle()
} 






closeButton.addEventListener('click', toggle)
popupEditButton.addEventListener('click', showPopup)
form.addEventListener('submit', formSubmitHandler)
popup.addEventListener('click', overlayClick)



