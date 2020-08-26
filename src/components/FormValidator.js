export default class FormValidator {
    constructor(config, form) {
        this._form = form
        this._inputSelector = config.inputSelector //   .popup__input
        this._submitButtonSelector = config.submitButtonSelector //  .popup__button
        this._inactiveButtonClass = config.inactiveButtonClass //  popup__button_disabled
        this._inputErrorClass = config.inputErrorClass //  popup__input_type_error
        this._errorClass = config.errorClass //  popup__error_visible
        this._errorElement = config.redSpanSelector //  .popup__error
        this._labelSelector = config.labelSelector //  .popup__label
        this._fieldsetSelector = config.fieldsetSelector //  .popup__content
        this._buttonElement = this._form.querySelector(this._submitButtonSelector)
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
    }

    _showInputError(inputSelector, errorMessage) {
        const errorElement = inputSelector.closest(this._labelSelector).querySelector(this._errorElement)
        inputSelector.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    _hideInputError(inputSelector) {
        const errorElement = inputSelector.closest(this._labelSelector).querySelector(this._errorElement)
        inputSelector.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
    }

    _checkInputValidity(inputSelector) {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector, inputSelector.validationMessage)
        } else {
            this._hideInputError(inputSelector)
        }
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', false)
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputSelector) => {
            return !inputSelector.validity.valid
        })
    }

    resetFormState() {
        this._inputList.forEach((item) => {
            this._hideInputError(item)
            this._buttonElement.textContent = "Сохранить"////////////////
        })
    }

    _setEventListeners() {
        this._toggleButtonState(this._inputList, this._buttonElement)
        this._inputList.forEach((item) => {
            item.addEventListener('input', () => {
                this._checkInputValidity(item)
                this._toggleButtonState()
            })
        })
    }

    enableValidation() {
        this._setEventListeners()
    }
    ableBtn(popup) {
        this._buttonElement.classList.remove('popup__button_disabled')
        this._buttonElement.removeAttribute('disabled')
    }
    disableBtn(popup) {
        this._buttonElement.classList.add('popup__button_disabled')
        this._buttonElement.setAttribute('disabled', false)
    }
}
//Функции, отвечающие на переключение состояния кнопки, должны находиться в классе валидации.