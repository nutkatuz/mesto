let popupEditButton = document.querySelector('.profile__edit-button')
let popupCloseButton = document.querySelector('.popup__close')
let popup = document.querySelector('.popup')
let form = document.querySelector('.popup__container')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_about')

let toggle = function () {
    popup.classList.toggle('popup_opened')
}

let openPopup = function () {
    toggle()
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

let formSubmitHandler = function (event) { 
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggle ()
}

let overlay = function (event) { 
    if (event.target != event.currentTarget) { return } 
    toggle()
} 

popupCloseButton.addEventListener('click', toggle)
popupEditButton.addEventListener('click', openPopup)
form.addEventListener('submit', formSubmitHandler)
popup.addEventListener('click', overlay)