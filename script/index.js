//let sayHallo = function () {console.log('Приветствую хозяйку, готов к работе')} sayHallo() вставляю для проверки кода

// объявим переменные для окошка редактирования
const popup = document.querySelector('.popup')
const popupEditButton = document.querySelector('.profile__edit-button')
const popupCloseButton = popup.querySelector('.popup__close')
const popupSaveButton = document.querySelector('.popup__save-button')
//const popupPlusButton = document.querySelector('.profile__add-button')
//добавила еще пару классов, так как не хочу ид использовать принципиально. потом бы перенести их classList.add
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
// объявим переменные для профиля
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

//разберемся с кнопкой с карандашом
let openPopup = function (event) {
    if (popup.classList.contains('popup_opened')){
    return editNow()
    }
    popup.classList.toggle('popup_opened')
}
let editNow = function (event) {//2 функция копирует ДАННЫЕ со странички в попап
    nameInput.value = profileName.textContent;//поля формы берут текст из страницы
    jobInput.value = profileJob.textContent;
}

//функция сохранения формы должна срабатывать при событии submit у формы
//Оксана, у меня здесь не форма, а кнопка. Так красивее
let savePopup = function() {
    event.preventDefault();//иначе на на секунду запишет, а потом срабатывает submit и перезагружает страницу
    profileName.textContent = nameInput.value;//функция копирует ИНПУТЫ попапа на страничку 
    profileJob.textContent = jobInput.value;
    popup.classList.toggle('popup_opened')//Вызвать функцию, которая закрывает модальное окно, необходимо внутри функции сохранения формы
}

// разберемся с кнопкой закрыть крестиком
let closeUnsaved = function (event) {
    popup.classList.toggle('popup_opened')
}

//после создания функций нужно вызвать их по имени в слушателе addEventListener
popupEditButton.addEventListener('click', openPopup)
popupSaveButton.addEventListener('click', savePopup) //Слушатель с кнопки "Сохранить" необходимо удалить.
popupCloseButton.addEventListener('click', closeUnsaved)// так-то можно popup.classList.remove вместо переключения, но нам такое показал Хаз.

//В планах создать оверлэй чтобы окошко закрывалось как в Фейсбуке при нажатии на оверлей. 
//console.log(popup__input.value)
// const overlay = document.querySelector('.overlay')
// const closePopup = function (event) {
//     if (event.target !== event.currentTarget){return}
// }