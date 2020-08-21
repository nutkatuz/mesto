import './index.css'
import {
    initialCards,
    config,
    profileNameSelector,
    profileJobSelector,
    containerSelector,
    addButton,
    editButton,
    popupZoom,
    popupNewCard,
    popupProfile,
    cardTemplateSelector,
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const newCardPopupForm = popupNewCard.querySelector('.popup__form')
const profilePopupForm = popupProfile.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

// GET 
function getUserData() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
        headers: {
            authorization: 'd53467ef-75db-4cf1-9a1c-2d2c544f18c8'
        }
    })
        .then(res => res.json())
        .then((result) => {
            let userdataObject = result;
const serverObjNameInHTML = document.querySelector(profileNameSelector);
serverObjNameInHTML.textContent = userdataObject.name;
const serverObjAboutInHTML = document.querySelector(profileJobSelector);
serverObjAboutInHTML.textContent = userdataObject.about;
            // {name: "Jacques Cousteau", about: "Sailor, researcher", avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg", _id: "f50d2675d6dd50019a3f3568", cohort: "cohort-14"}
            // about: "Sailor, researcher"
            // avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
            // cohort: "cohort-14"
            // name: "Jacques Cousteau"
            // _id: "f50d2675d6dd50019a3f3568"
            // __proto__: Object
        })
        .catch((err) => console.log(`Ошибка запроса ${err}`))
}
getUserData()
// Токен: d53467ef-75db-4cf1-9a1c-2d2c544f18c8
// Идентификатор группы: cohort-14



const profileValidation = new FormValidator(config, profilePopupForm);
profileValidation.enableValidation();

const cardValidation = new FormValidator(config, newCardPopupForm);
cardValidation.enableValidation();

const userInfo = new UserInfo( //объявление//присваивание ключей к тем же св-вам, что и в конструкторе 
    {
        profileNameSelector: profileNameSelector,
        profileJobSelector: profileJobSelector
    }
);

const popupWithImage = new PopupWithImage(popupZoom);

const popupWithFormEdit = new PopupWithForm(popupProfile, {
    handleSubmit: (item) => {
        userInfo.setUserInfo(item)
    }
});

const showEditPopup = () => {
    profileValidation.resetFormState(popupProfile);
    profileValidation.ableBtn(popupProfile);
    popupWithFormEdit.open();   // вначале ресетить форму надо
    const user = userInfo.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.job;  //а потом уже  значения из разметки.
}


const popupWithFormAdd = new PopupWithForm(
    popupNewCard, {
    handleSubmit: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => { popupWithImage.open(item) }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItem(myCard);
    }
});

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupWithImage.open(item)
            }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItems(myCard);
    }
}, containerSelector);
section.renderItems(); //запускаем колбэк


const showNewCardPopup = () => {
    cardValidation.resetFormState(popupNewCard);
    cardValidation.disableBtn(popupNewCard);
    popupWithFormAdd.open();
};

popupWithFormAdd.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithImage.setEventListeners();
editButton.addEventListener('click', () => showEditPopup());
addButton.addEventListener('click', () => showNewCardPopup())

// 
// let initialCards = [];
// const form = document.forms.search;
// const content = document.querySelector('.content');
// const result = document.querySelector('.content__result');
// const error = document.querySelector('.content__error');
// const spinner = document.querySelector('.spinner');

// document.addEventListener('click', () => {
//     // renderLoading(true);
//   search()
//     .then((res) => {
//         if (res.ok) {
//           return res.json();
//           console.log(res);
//         }
//         return Promise.reject(res.status);
//       })
//     .then((res) => {    
//       renderResult(res.link)//передадим сюда переменные св-в объекта
//       })
//     .catch((err) => {
//       renderError(`Ошибка ${err}`)
//       })
//     // .finally(() => {renderLoading(false)})
// })
// document.onclick;

// function search () {
//     return fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
//         headers: {
//             authorization: 'd53467ef-75db-4cf1-9a1c-2d2c544f18c8'
//         }
//     })
// }


// const renderPlace = (item) => {
//     const card = new Card({
//         data: item,
//         handleCardClick: () => { popupWithImage.open(item) }
//     }, cardTemplateSelector);
//     const myCard = card.generateCard();
//     section.addItem(myCard);
// }

// // 
// api.getInitialCards() 

//         .then((res) => {
//         return res.json()
//         })
//         .then(res => section.addItems(res))
//         .then(res => {
//             if (res.ok) {
//               return res.json();
//             }
//           });

// api.getInitialCards() 
        // .then((res) => {
        //     // console.log(res);
        //     // const item = Object.create(res);
        //     const card = new Card({
        //         // data: {name: res.name, link: res.link},
        //         // [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
        //         data: res,
        //         handleCardClick: () => { popupWithImage.open(res) }
        //     }, '.card-template');
        //     const myCard = card.generateCard();
        //     section.addItem(myCard);
        // })
// }
// getCards()