import './index.css'
import {
    config,
    profileNameSelector,
    profileJobSelector,
    containerSelector,
    cardTemplateSelector,
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/API.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'

const avatarButton = document.querySelector('.profile__photobtn')
const addButton = document.querySelector('.profile__add-button')
const editButton = document.querySelector('.profile__edit-button')
const popupProfile = document.querySelector('.popup_profile-edit')
const popupZoom = document.querySelector('.popup_zoom')
const popupNewCard = document.querySelector('.popup_new-card')
const popupUpdateAvatar = document.querySelector('.popup_update-avatar')
const popupConfirm = document.querySelector('.popup_confirm')
const newCardPopupForm = popupNewCard.querySelector('.popup__form')
const profilePopupForm = popupProfile.querySelector('.popup__form')
const avatarPopupForm = popupUpdateAvatar.querySelector('.popup__form')



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co',
    headers: {
        authorization: 'd53467ef-75db-4cf1-9a1c-2d2c544f18c8',
        'Content-Type': 'application/json'
    }
})

const userInfo = new UserInfo({
    profileNameSelector: profileNameSelector,
    profileJobSelector: profileJobSelector
})

let userId



const section = new Section({
    renderer: (item) => {
        renderCardIntoSection(item, 'append')
    }
}, containerSelector)



Promise.all([api.getUserData(), api.getInitialItems()])
.then((data) => {
    userId = data[0]._id
    userInfo.setUserInfo(data[0])

    section.renderItems(data[1])
    
})
  .catch((err) => {
    console.log(`Ошибка ${err}`)
})



const popupWithImage = new PopupWithImage(popupZoom)
popupWithImage.setEventListeners()


const popupWithConfirm = new PopupWithConfirm(popupConfirm)
popupWithConfirm.setEventListeners()




const popupWithFormEdit = new PopupWithForm(popupProfile, {
    handleSubmit: (object) => {
        api.patchUserData(object.firstInp, object.secondInp)
            .then((res) => {
                userInfo.setUserInfo(res)
                popupWithFormEdit.close()
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }
})

popupWithFormEdit.setEventListeners()

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')

const showEditPopup = () => {
    profileValidation.resetFormState(popupProfile)
    profileValidation.ableBtn(popupProfile)
    popupWithFormEdit.open()
    const objectForm = userInfo.getUserInfo()
    nameInput.value = objectForm.name
    jobInput.value = objectForm.job
}

editButton.addEventListener('mouseup', () => showEditPopup())







const popupWithFormAvatar = new PopupWithForm(popupUpdateAvatar, {
    handleSubmit: (item) => {
        api.patchUserAvatar(item.thirdInp)
            .then((res) => {
                document.querySelector('.profile__photobtn').style.backgroundImage = `url('${res.avatar}')`
                popupWithFormAvatar.close()
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }
})

popupWithFormAvatar.setEventListeners()

const showAvatarPopup = () => {
    avatarValidation.resetFormState(popupUpdateAvatar)
    avatarValidation.disableBtn(popupUpdateAvatar)
    popupWithFormAvatar.open()
}

avatarButton.addEventListener('mouseup', () => showAvatarPopup())







const popupWithFormAdd = new PopupWithForm(
    popupNewCard, {
        handleSubmit: (item) => {
            api.postItem(item)
                .then((res) => {
                    renderCardIntoSection(res, 'prepend')
                    popupWithFormAdd.close()
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`)
                })
        }
    })

popupWithFormAdd.setEventListeners()

const showAddPopup = () => {
    cardValidation.resetFormState(popupNewCard)
    cardValidation.disableBtn(popupNewCard)
    popupWithFormAdd.open()
}

addButton.addEventListener('mouseup', () => showAddPopup())






function renderCardIntoSection(item, prepend) {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.open(item)
        },
        handleDeleteClick: () => {
            popupWithConfirm.open(item)
            popupWithConfirm.submitHandler(() => {
                api.deleteItem(item._id)
                    .then((res) => {
                        card.removeCard(res)
                        popupWithConfirm.close()
                    })
                    .catch((err) => {
                        console.log(`Ошибка ${err}`)
                    })
            })
        },
        handleAddLike: () => api.putLike(item._id)
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            }),
        handleDeleteLike: () => api.deleteLike(item._id)
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            }),
        templateSelector: cardTemplateSelector,
        userId: userId
    })
    const cardElement = card.generateCard()
    section.renderItem(cardElement, prepend)
}







const profileValidation = new FormValidator(config, profilePopupForm)
profileValidation.enableValidation()
const cardValidation = new FormValidator(config, newCardPopupForm)
cardValidation.enableValidation()
const avatarValidation = new FormValidator(config, avatarPopupForm)
avatarValidation.enableValidation()