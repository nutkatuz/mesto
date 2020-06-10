// объявим переменные для окошка редактирования
const popup = document.querySelector('.popup')
const popupEditButton = document.querySelector('.profile__edit-button')
const popupCloseButton = popup.querySelector('.popup__close')
const popupSaveButton = document.querySelector('.popup__save-button')
const popupPlusButton = document.querySelector('.profile__add-button')
//добавила еще пару классов, так как не хочу ид использовать принципиально. потом бы перенести их classList.add
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

// объявим переменные для профиля
const profileJob = document.querySelector('.profile__job')
const profileName = document.querySelector('.profile__name')
// разберемся с кнопкой закрыть крестиком
// нам нужно отдельное название функции, а не просто ее выполнение
const popupToggle = function (event) {//'1 функция закрывает попап без сохранения - x
    popup.classList.toggle('popup_opened');
}
popupCloseButton.addEventListener('click', popupToggle);// так-то можно popup.classList.remove вместо переключения, но нам такое показал Хаз.
popupCloseButton.addEventListener('click', function() {
//очистить поля ввода инпута    nameInput.value='';
//очистить поля ввода инпута    jobInput.value='';
});

//разберемся с кнопкой с карандашом
//2 функция открывает попап и копирует ДАННЫЕ со странички в попап
popupEditButton.addEventListener('click', function() {
        //const popupInput = document.querySelector('.popup__input')
        //popupInput.insertAdjacentText('afterbegin',`${inputName.value}`)
        nameInput.value = profileName.textContent;//поля формы берут текст из страницы
        jobInput.value = profileJob.textContent;
    });
popupEditButton.addEventListener('click', popupToggle);

//разберемся с кнопкой СОХРАНИТЬ
//3 функция копирует ИНПУТЫ попапа на страничку 
popupSaveButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    //profileName.insertAdjacentText('afterbegin',`.`); //это выводит хренотень какую-то ${popupInput.value}. не вывел с ${inputName.value}
});
popupSaveButton.addEventListener('click', popupToggle) //*и закрывает попап

//
//console.log(popup__input.value)
// const header = document.querySelector('.header')
// const closePopup = function (event) {
//     if (event.target !== event.currentTarget){return}
// }
// popup.addEventListener('click', closePopup)



