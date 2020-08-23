
export default class UserInfo {
    constructor({
        profileNameSelector,
        profileJobSelector
    }) { 
        this._profileName = document.querySelector(profileNameSelector)
        this._profileJob = document.querySelector(profileJobSelector)
        this._profileAvatar = document.querySelector('.profile__photo')
    }
    
    getUserInfo() {
        this._objectForm = {};
        this._objectForm.name = this._profileName.textContent
        this._objectForm.job = this._profileJob.textContent
        // this._objectForm.avatar = this._profileAvatar.style.backgroundImage
        return this._objectForm 
    }

    setUserInfo(res) {
        this._profileName.textContent =  res.name //(item.firstInp) // не из инпута, а тиз сервера
        this._profileJob.textContent = res.about//(item.secondInp)
        this._profileAvatar.style.backgroundImage = `url('${res.avatar}')`
    }
}



// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
// геттер - публичный метод getUserInfo пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// возвращает объект с новыми данными пользователя.//имя со страницы в объект//профессия со страницы в объект
// сеттер - публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
// это get наоборот, присваивает на страницу что? значения input.name="secondInp"
