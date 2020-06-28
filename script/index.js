//для профиля
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let editButton = document.querySelector('.profile__edit-button')
//для окна редактирования профиля
let popupProfile = document.querySelector('.popup_profile-edit')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_about')
let formPopupProfile = popupProfile.querySelector('.popup__container')
let closeButtonPopupProfile = popupProfile.querySelector('.popup__close')
//для карточки
let addButton = document.querySelector('.profile__add-button')
let trashButton = document.querySelector('.card__recycle-bin')
let heartButton = document.querySelector('.card__like')
//для окна добавления новой карточки
let popupNewCard = document.querySelector('.popup_new-card')
let closeButtonOfCard = popupNewCard.querySelector('.popup__close')
let placeInput = document.querySelector('.popup__input_place-name')
let linkInput = document.querySelector('.popup__input_image_url')
let formPopupNewCard = popupNewCard.querySelector('.popup__container')
let closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close')
//для просмотра фото 
let popupZoom = document.querySelector('.popup_zoom')
let figureZoom = document.querySelector('.zoom')
let closeButtonPopupZoom = popupZoom.querySelector('.popup__close')
let zoomImage = document.querySelector('.zoom__image')
let zoomTitle = document.querySelector('.zoom__caption')

//общие
let popup = document.querySelector('.popup')

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
let formSubmitHandlerProfile = function (event) { 
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
formPopupProfile.addEventListener('submit', formSubmitHandlerProfile)
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


//пусть JS загрузит 6 карточек из коробки:
const initialCards = [
    {
        name: 'Мурманск',
        link: './images/places/murmanskbarincevo.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsSection = document.querySelector('.places')
const cardTemplate = document.querySelector('#card-template')

function renderCards(prop1, prop2) {
    let card = cardTemplate.content.cloneNode(true)
    card.querySelector('.card__title').textContent = prop1
    card.querySelector('.card__image').src = prop2
    card.querySelector('.card__recycle-bin').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
        })
    card.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
        })
        
    card.querySelector('.card__image').addEventListener('click', function (evt) {
            toggle(popupZoom)
            zoomImage.setAttribute('src', evt.target.src)
                    // zoomTitle.textContent = card.querySelector('.card__title').textContent
            zoomTitle.textContent = prop1
                    })

    cardsSection.append(card)
}
//он не может прочитать свойства name и link, поэтому надо через колбэк-функцию метода их вызвать
initialCards.forEach(item => {
    renderCards(item.name, item.link)
})

//Дайте пользователю возможность добавлять карточки:
function addCard(item) {
    let card = cardTemplate.content.cloneNode(true)
    card.querySelector('.card__title').textContent = item.name
    card.querySelector('.card__image').src = item.link

    card.querySelector('.card__recycle-bin').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
        })

    card.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
        })

    card.querySelector('.card__image').addEventListener('click', function (evt) {
            toggle(popupZoom)
            zoomImage.setAttribute('src', evt.target.src)
                    // zoomTitle.textContent = card.querySelector('.card__title').textContent
            zoomTitle.textContent = item.name
                    })
    
    cardsSection.prepend(card)//здесь работает. а если выше слушателей, то ломается кнопка сохранения
}

function formSubmitHandlerNewCard (evt) { 
    evt.preventDefault();
    let name = placeInput.value;
    let link = linkInput.value;
    addCard({ name, link })
    toggle (popupNewCard)
}
formPopupNewCard.addEventListener('submit', formSubmitHandlerNewCard)

//Настройте просмотр фотографий. Пусть открываются нажатием на картинку и закрываются кликом на крестик:
closeButtonPopupZoom.addEventListener('click', () => toggle(popupZoom))