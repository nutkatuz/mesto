let popupEditButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = popup.querySelector('.popup__close')
let form = document.querySelector('.popup__container')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')

let toggle = function () {
    popup.classList.toggle('popup_opened')
}

let autoFill = function () {
    form.nameInput.value = profileName.textContent;
    form.jobInput.value = profileJob.textContent;
}

let openClose = function () {
    autoFill ()
    toggle ()
}

let formSubmitHandler = function (e) { 
    e.preventDefault();
    profileName.textContent = form.nameInput.value;
    profileJob.textContent = form.jobInput.value;
    toggle ()
}

popupEditButton.addEventListener('click', openClose)
popupCloseButton.addEventListener('click', openClose)
form.addEventListener('submit', formSubmitHandler)



const overlay = function (event) {
    if (event.target != event.currentTarget) { return }
    toggle()
    console.log(event.target)
    console.log(event.currentTarget)
}
popup.addEventListener('click', overlay)


// Данные в форму не вставляются, но должны.
// Попробуйте внести текст в форму, не сохранить, закрыть модальное окно через кнопку закрытия.
// При повторном открытии модального окна, там будут старые несохраненные данные вместо данных со страницы.
// - Это была моя задумка, как черновик для пользователя.
//const popupSaveButton = document.querySelector('.popup__save-button')
//const nameInput = document.querySelector('.popup__input_name')
//const jobInput = document.querySelector('.popup__input_about')
//const popupPlusButton = document.querySelector('.profile__add-button')
//popupSaveButton.addEventListener('click', savePopup)
//после создания функций нужно вызвать их по имени в слушателе addEventListener
 //Чтобы страница не перезагружалась и preventDefault() работал, иначе на секунду запишет, а потом срабатывает submit и перезагружает страницу.
//Функция должна вызываться только при submit у формы.