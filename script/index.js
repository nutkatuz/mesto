let popupEditButton = document.querySelector('.profile__edit-button')
let popupCloseButton = document.querySelector('.popup__close')
let popup = document.querySelector('.popup')
let form = document.querySelector('.popup__container')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')

//добавила следующие две строчки
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_about')

let toggle = function () {
    popup.classList.toggle('popup_opened')
}

// let autoFill = function () {
//     form.nameInput.value = profileName.textContent;
//     form.jobInput.value = profileJob.textContent;
// }

// let openClose = function () {
//     autoFill ()
//     toggle ()
// }
//"Эта функция лишняя, пропишите:
//На одну или две функции 
//открытие со вставкой данных в форму 
//и закрытие без вставки данных в форму
//Незачем делать 3 функции, задача одной из которых вызов двух предыдущих"
// - хорошо. закрытие без вставки есть, :
let otkrytieSoVstavkoyDvF = function () {
    toggle()
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

let formSubmitHandler = function (event) { 
    event.preventDefault();
    profileName.textContent = nameInput.value;//убрала form.nameInput.value
    profileJob.textContent = jobInput.value;//убрала form.jobInput.value
    toggle ()
}

const overlay = function (event) { 
    if (event.target != event.currentTarget) { return } 
    toggle()
} 

//"В момент закрытия модального окна должен 
//изменяться только classList модального окна."
//- хорошо,//соответственно заменила openClose из этой
popupCloseButton.addEventListener('click', toggle)
//соответственно заменила openClose из этой
popupEditButton.addEventListener('click', otkrytieSoVstavkoyDvF)
form.addEventListener('submit', formSubmitHandler)
//и пятое замечание "удалите консоль.лог" я уже всё
popup.addEventListener('click', overlay)