// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: 
// элемента имени пользователя и элемента информации о себе.
export default class UserInfo {
    constructor({ profileName, profileStatus }) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileStatus);
    }

    getUserInfo() {// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
        this._editChange = {};
        this._editChange.nameInput = this._profileName.textContent;
        this._editChange.jobInput = this._profileJob.textContent;

        return this._editChange
    }// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

    // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.job;
    }
}