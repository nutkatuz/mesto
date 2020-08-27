export default class UserInfo {
    constructor({
        profileNameSelector,
        profileJobSelector
    }) { 
        this._profileName = document.querySelector(profileNameSelector)
        this._profileJob = document.querySelector(profileJobSelector)
        this._profileAvatar = document.querySelector('.profile__photobtn')
    }
    
    getUserInfo() {
        this._objectForm = {};
        this._objectForm.name = this._profileName.textContent
        this._objectForm.job = this._profileJob.textContent
        return this._objectForm 
    }

    setUserInfo(res) {
        this._profileName.textContent =  res.name
        this._profileJob.textContent = res.about
        this._profileAvatar.style.backgroundImage = `url('${res.avatar}')`
    }
}