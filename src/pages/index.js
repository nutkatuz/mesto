import './index.css'
import {
    // initialCards,
    config,
    profileNameSelector,
    profileJobSelector,
    containerSelector,
    addButton,
    editButton,
    popupZoom,
    popupNewCard,
    popupProfile,
    popupUpdateAvatar,
    cardTemplateSelector,
    popupConfirm
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/API.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
const newCardPopupForm = popupNewCard.querySelector('.popup__form')
const profilePopupForm = popupProfile.querySelector('.popup__form')
const avatarPopupForm = popupUpdateAvatar.querySelector('.popup__form')


const profilePhotoBtn = document.querySelector('.profile__photo')
// Токен: d53467ef-75db-4cf1-9a1c-2d2c544f18c8
// Идентификатор группы: cohort-14
// Адрес сервера: https://mesto.nomoreparties.co

// новый класс в котором будет сосредоточена логика для запросов к апи
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co',
    headers: {
        authorization: 'd53467ef-75db-4cf1-9a1c-2d2c544f18c8',
        'Content-Type': 'application/json'
    }
})

const userInfo = new UserInfo( //объявление//присваивание ключей к тем же св-вам, что и в конструкторе 
    {
        profileNameSelector: profileNameSelector,
        profileJobSelector: profileJobSelector
    }
);
let userId;
api.getUserInfo()
    .then((res) => {
        // const serverObjNameInHTML = document.querySelector(profileNameSelector);
        // serverObjNameInHTML.textContent = res.name;
        // const serverObjAboutInHTML = document.querySelector(profileJobSelector);
        // serverObjAboutInHTML.textContent = res.about;
        userInfo.setUserInfo(res);
        userId = res._id;
    })
    .catch((err) => {
        console.log(err);
    });



const popupWithConfirm = new PopupWithConfirm(popupConfirm); //В конструктор ничего не надо, попап с подтверждением на все случаи жизни
popupWithConfirm.setEventListeners();
// index.js:57 Uncaught TypeError: Cannot read property '_id' of undefined
//     at PopupWithConfirm.handleSubmit [as _handleSubmit] (index.js:57)
//     at PopupWithConfirm.value [as _formSubmit] (PopupWithConfirm.js:51)
//     at HTMLFormElement.eval (PopupWithConfirm.js:88)


function renderCard(item) {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.open(item)
        },
        handleDeleteClick: () => {
            popupWithConfirm.open(item);
            popupWithConfirm.todo(() => { //здесь можно прописать любую функцию для сабмита popupWithConfirm
                api.deleteItem(item._id)
                    .then((res) => {
                        card.removeCard(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        popupWithConfirm.renderLoading(false)
                    });
            })
        },
        templateSelector: cardTemplateSelector,
        handleAddLike: () => api.addLike(item._id),
        handleDeleteLike: () => api.removeLike(item._id),
        userId: userId
    })
    const cardElement = card.generateCard();
    section.addItem(cardElement);
}





const section = new Section({
    renderer: (item) => {
        renderCard(item)
    }
}, containerSelector);

api.getInitialItems()
    .then((res) => {
        section.renderItems(res)
    })
    .catch((err) => {
        console.log(err);
    });




// Новый попап для редактирования аватара, 
const popupWithFormAvatar = new PopupWithForm(popupUpdateAvatar, {
    handleSubmit: (item) => {
        api.patchUserAvatar(item.thirdInp)
            .then((res) => {
                document.querySelector('.profile__photo').style.backgroundImage = `url('${res.avatar}')`
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
            .finally(() => {
                popupWithFormAvatar.renderLoading(false)
            });
    }
});
popupWithFormAvatar.setEventListeners(); // const avatarURLInput = document.querySelector('.popup__input_update-avatar')
const showAvatarPopup = () => {
    avatarValidation.resetFormState(popupUpdateAvatar); //мы не уверены что так должно быть
    avatarValidation.disableBtn(popupUpdateAvatar);
    popupWithFormAvatar.open();
};




const profileValidation = new FormValidator(config, profilePopupForm);
profileValidation.enableValidation();
const cardValidation = new FormValidator(config, newCardPopupForm);
cardValidation.enableValidation();
const avatarValidation = new FormValidator(config, avatarPopupForm);
avatarValidation.enableValidation();


const popupWithImage = new PopupWithImage(popupZoom);
popupWithImage.setEventListeners();





const popupWithFormEdit = new PopupWithForm(popupProfile, {
    handleSubmit: (object) => {
        api.patchUserInfo(object.firstInp, object.secondInp) //нужно передать содержимое инпутов
            .then((res) => {
                userInfo.setUserInfo(res) // вместо (item)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithFormEdit.renderLoading(false);
            })
    }
});
popupWithFormEdit.setEventListeners();

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

const showEditPopup = () => {
    profileValidation.resetFormState(popupProfile);
    profileValidation.ableBtn(popupProfile);
    popupWithFormEdit.open(); // вначале ресетить форму надо
    const objectForm = userInfo.getUserInfo();
    nameInput.value = objectForm.name;
    jobInput.value = objectForm.job; //а потом уже  значения из разметки.
}
editButton.addEventListener('mouseup', () => showEditPopup());

profilePhotoBtn.addEventListener('mouseup', () => showAvatarPopup());



const popupWithFormAdd = new PopupWithForm(
    popupNewCard, {
    handleSubmit: (item) => {
        api.postItem(item)
            .then((res) => {
                renderCard(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupWithFormAdd.renderLoading(false);
            })
    }
});
popupWithFormAdd.setEventListeners();

const showNewCardPopup = () => {
    cardValidation.resetFormState(popupNewCard);
    cardValidation.disableBtn(popupNewCard);
    popupWithFormAdd.open();
};
addButton.addEventListener('mouseup', () => showNewCardPopup())





// const section = new Section({
//     items: res,
//     renderer: (data) => {
//         const card = new Card({
//             data: data,//данныe карточки включая инфу по лайкам
//             handleCardClick: () => {
//                 popupWithImage.open(item)
//             },
//             handleDeleteIconClick: (card) => {
//                 const popupWithConfirm = new PopupWithConfirm(popupConfirm, {
//                     handleSubmit: () => {
//                         // renderLoading(true);
//                         api.deleteCard(card._cardId)
//                             .then((res) => {
//                                 card.clear(res)// this!!! card.closest('.card').remove()
//                                 popupWithConfirm.close();
//                             })
//                         // .catch((err) => {
//                         //     console.log(err);
//                         // })
//                         // .finally(() => {
//                         //     renderLoading(false);
//                         // })
//                     }
//                 });
//                 deleteCard.open(item);
//             },
//             handleLikeClick: () => {
//                 if (card.querySelector('.card__like').classList.contains('card__like_active')) {
//                     api.deleteLikeItem(item._id)
//                     .then((res) => card.like(res.likes))
//                     .catch((err) => {
//                         console.log(err);
//                     })
//                 } else {
//                     api.addLikeItem(item._id)
//                     .then((res) => card.like(res.likes))
//                     .catch((err) => {
//                         console.log(err);
//                     })
//                 }
//             }
//         }, cardTemplateSelector);
//         const myCard = card.generateCard();
//         section.addItems(myCard);
//     }
// }, containerSelector);
// section.renderItems(); //запускаем колбэк