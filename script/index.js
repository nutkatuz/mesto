const popupEditButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = popup.querySelector('.popup__close')
const form = document.querySelector('.popup__container')
const popupSaveButton = document.querySelector('.popup__save-button')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
//const popupPlusButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
//mini-функции, которые должны быть объявлены до вызова
    let toggle = function (event) {
        popup.classList.toggle('popup_opened')
    }
    let autoFill = function (event) {
        nameInput.value = profileName.textContent;//поля формы берут текст из страницы
        jobInput.value = profileJob.textContent;
    }
//

let openClose = function () {
    autoFill ()
    toggle ()
}

let formSubmitHandler = function (e) { //Функция должна вызываться только при submit у формы.
    e.preventDefault(); //Чтобы страница не перезагружалась и preventDefault() работал, иначе на секунду запишет, а потом срабатывает submit и перезагружает страницу.
    profileName.textContent = nameInput.value;//функция страничке присвоит ИНПУТЫ попапа 
    profileJob.textContent = jobInput.value;
    toggle ()
}

//после создания функций нужно вызвать их по имени в слушателе addEventListener
popupEditButton.addEventListener('click', openClose)
//popupSaveButton.addEventListener('click', savePopup)
popupCloseButton.addEventListener('click', openClose)
form.addEventListener('submit', formSubmitHandler);

//В планах создать оверлэй чтобы окошко закрывалось как в Фейсбуке при нажатии на оверлей. 
//console.log(popup__input.value)
// const overlay = document.querySelector('.overlay')
// const closePopup = function (event) {
//     if (event.target !== event.currentTarget){return}
// }
//    
// !!!!!!!!!!! Данные в форму не вставляются, но должны.
// Попробуйте внести текст в форму, не сохранить, закрыть модальное окно через кнопку закрытия.
// При повторном открытии модального окна, там будут старые несохраненные данные вместо данных со страницы.
// - Это была моя задумка! как черновик для пользователя.