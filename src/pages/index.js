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

api.getUserInfo()
    .then((res) => {
        // const serverObjNameInHTML = document.querySelector(profileNameSelector);
        // serverObjNameInHTML.textContent = res.name;
        // const serverObjAboutInHTML = document.querySelector(profileJobSelector);
        // serverObjAboutInHTML.textContent = res.about;
        userInfo.setUserInfo(res);
        const userId = res._id;
    })
    .catch((err) => {
        console.log(err);
    });







// новый экземпляр нового класса для попапа с подтверждением при удалении карточки 
const popupWithConfirm = new PopupWithConfirm(popupConfirm, {
    handleSubmit: (item) => {
        popupWithConfirm.method(item)
    }
});


// Новый попап для редактирования аватара, 
const popupWithFormAvatar = new PopupWithForm(popupUpdateAvatar, {
    handleSubmit: (item) => {
        // const avatarURL = avatarURLInput.value; - так нельзя, потому что сама ф не здесь, а внутри PopupWithForm
        // popupWithFormAvatar.renderLoading(true);
        api.patchUserAvatar(item.thirdInp)
            .then((res) => {
                document.querySelector('.profile__photo').style.backgroundImage = `url('${res.avatar}')`
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
        // .finally(() => {
        //     popupWithFormAvatar.renderLoading(false)
        // });
    }
});
popupWithFormAvatar.setEventListeners();
// const avatarURLInput = document.querySelector('.popup__input_update-avatar')
const showAvatarPopup = () => {
    avatarValidation.resetFormState(popupUpdateAvatar);//мы не уверены что так должно быть
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
        // renderLoading(true)
        api.patchUserInfo(object.firstInp, object.secondInp)//нужно передать содержимое инпутов
            .then((res) => {
                userInfo.setUserInfo(res)// вместо (item)
            })
            .catch((err) => {
                console.log(err);
            })
        // .finally(() => {
        //     renderLoading(false);
        // })
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
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupWithImage.open(item)
            }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItem(myCard);
    }
});
popupWithFormAdd.setEventListeners();

const showNewCardPopup = () => {
    cardValidation.resetFormState(popupNewCard);
    cardValidation.disableBtn(popupNewCard);
    popupWithFormAdd.open();
};
addButton.addEventListener('mouseup', () => showNewCardPopup())





const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,//данныe карточки включая инфу по лайкам
            handleCardClick: () => {
                popupWithImage.open(item)
            },
            handleDeleteIconClick: (card) => {
                const popupConfirm = new PopupWithForm(popupConfirm, {//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                handleSubmit: () => { 
                                    // renderLoading(true);
                                    api.deleteCard(card._cardId)
                                        .then((res) => {
                                            card._remove(res);
                                            deleteCard.close();
                                        })
                                        // .catch((err) => {
                                        //     console.log(err);
                                        // })
                                        // .finally(() => {
                                        //     renderLoading(false);
                                        // })
                                }
                            });
                            deleteCard.open(item);
            },
            handleLikeClick: (card) => {
            if (card) {//если сходится айдишка
                api.addLikeItem(item._id)
                .then(
                    this._card.querySelector('.card__like').classList.toggle('card__like_active')
                )
            }else{
                api.deleteLikeItem(item._id), userId
            }
        }
        }, cardTemplateSelector);
        const myCard = card.generateCard();
        section.addItems(myCard);
    }
}, containerSelector);
section.renderItems(); //запускаем колбэк
