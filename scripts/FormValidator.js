export class FormValidator {
    constructor(config, form) {
        this._form = form
        this._inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._errorClass = config.errorClass
        this._redSpanSelector = config.redSpanSelector
        this._labelSelector = config.labelSelector
        this._fieldsetSelector = config.fieldsetSelector
    }

    _showInputError(inputSelector, errorMessage) {
        const errorElement = inputSelector.closest(this._labelSelector).querySelector(this._redSpanSelector)
        inputSelector.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    _hideInputError(inputSelector) {
        const errorElement = inputSelector.closest(this._labelSelector).querySelector(this._redSpanSelector)
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
        this._buttonElement = this._form.querySelector(this._submitButtonSelector)
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', false)
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _hasInvalidInput() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
        return this._inputList.some((inputSelector) => {
            return !inputSelector.validity.valid
        })
    }

    resetFormState() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
        this._inputList.forEach((inputSelector) => {
            this._hideInputError(inputSelector)
        })
    }

    _setEventListeners() {
        const _inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
        const submitButtonSelector = this._form.querySelector(this._submitButtonSelector)
        this._toggleButtonState(_inputList, submitButtonSelector)
        this._inputList.forEach((inputSelector) => {
            inputSelector.addEventListener('input', () => {
                this._checkInputValidity(inputSelector)
                this._toggleButtonState()
            })
        })
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => evt.preventDefault())
        this._setEventListeners()
    }
}