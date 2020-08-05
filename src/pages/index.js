import './index.css';
import { openPopup, closePopup, popupProfile, popupNewCard } from '../components/Popup.js'
import { initialCards, configCard, config } from '../utils/constants.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'

const addButton = document.querySelector('.profile__add-button')
const cardsSection = document.querySelector('.places')

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const editButton = document.querySelector('.profile__edit-button')

const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_about')
const profilePopupForm = popupProfile.querySelector('.popup__window')

const placeInput = document.querySelector('.popup__input_place-name')
const linkInput = document.querySelector('.popup__input_image_url')
const newCardPopupForm = popupNewCard.querySelector('.popup__window')
const cardTemplateSelector = '.card-template'
const containerSelector = '.places'

const profileValidation = new FormValidator(config, profilePopupForm)
profileValidation.enableValidation()

const cardValidation = new FormValidator(config, newCardPopupForm)
cardValidation.enableValidation()
//
// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
const renderer = function (item) {
    const card = new Card(item, cardTemplateSelector, configCard)
    const cardElement = card.generateCard()
    return cardElement
}

const renderAllItems = function () {
    initialCards.forEach((item) => {
    const cardElement = renderer(item)
    cardsSection.append(cardElement)
    })
}
renderAllItems()
// const cardList = new Section({
//     data: initialCards,
//     renderer: (item) => {
//       const card = item.isOwner
//         ? new UserCard(item, '.card-template_type_user')
//         : new DefaultCard(item, '.card-template_type_default');
  
//       const cardElement = card.generateCard();
  
//       cardList.setItem(cardElement);
//       },
//     },
//     cardListSection
//   );
//cardList.renderItems();

const addItem = function () {
    const name = placeInput.value
    const link = linkInput.value
    const cardElement = renderer({ name, link })
    cardsSection.prepend(cardElement)
}

//
const showEditPopup = function () {
    openPopup(popupProfile)
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
    const submitButtonSelector = popupProfile.querySelector('.popup__button')
    submitButtonSelector.classList.remove(config.inactiveButtonClass)
    profileValidation.resetFormState()
}

const showNewCardPopup = function () {
    openPopup(popupNewCard)
    newCardPopupForm.reset()
    const submitButtonSelector = popupNewCard.querySelector('.popup__button')
    submitButtonSelector.classList.add(config.inactiveButtonClass)
    cardValidation.resetFormState()
}

const formSubmitHandlerProfile = function (evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupProfile)
}

const formSubmitHandlerNewCard = function (evt) {
    evt.preventDefault();
    addItem(placeInput.value, linkInput.value)
    closePopup(popupNewCard)
}

editButton.addEventListener('click', showEditPopup)
addButton.addEventListener('click', showNewCardPopup)
profilePopupForm.addEventListener('submit', formSubmitHandlerProfile)
newCardPopupForm.addEventListener('submit', formSubmitHandlerNewCard)
