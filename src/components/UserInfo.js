// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
export default class UserInfo { // Принимает в конструктор объект с селекторами двух элементов: 
    constructor({   // элемента имени пользователя и элемента информации о себе.
        profileNameSelector,
        profileJobSelector
    }) { 
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
    }
    // публичный метод getUserInfo пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        this._profileValues = {};
        this._profileValues.nameInput = this._profileName.textContent;//со страницы в инпут
        this._profileValues.jobInput = this._profileJob.textContent;

        return this._profileValues // возвращает объект с новыми данными пользователя. 
    }

    // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.job;
    }
}