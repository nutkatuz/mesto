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
    getUserInfo = () => {
        this._object = {};
        this._object.name = this._profileName.textContent;//со страницы в инпут
        this._object.job = this._profileJob.textContent;
        return this._object // возвращает объект с новыми данными пользователя. 
    }

    // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(item) {// это get наоборот
        this._profileName.textContent = item.name;
        this._profileJob.textContent = item.job;
    }
}