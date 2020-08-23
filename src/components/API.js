export default class Api {
  constructor({
    baseUrl,
    headers
  }) { // options
    this.baseUrl = baseUrl
    this.headers = headers
  }


  // получить список всех карточек в виде массива. Начальные карточки должны подгружаться с сервера. Для этого сделайте GET-запрос: // GET https://mesto.nomoreparties.co/v1/cohortId/cards В ответ придёт JSON с массивом карточек, которые загрузили студенты вашей группы
  getItems() {
    return fetch(`${this.baseUrl}/v1/cohort-14/cards`, {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
        })
  }

  // Чтобы добавить на сервер новую карточку, отправьте POST-запрос:  POST https://mesto.nomoreparties.co/v1/cohortId/cards  В заголовках запроса, кроме токена, необходимо отправить Content-Type, а в теле — JSON с двумя свойствами — name и link. В name должно быть название создаваемой карточки, а в link — ссылка на картинку. Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки:
  // добавить карточку
  createItem(item) { // { name: 'blabla' }
    return fetch(`${this.baseUrl}/v1/cohort-14/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
        })
  }


  // удалить карточку   После того, как сделаете так, чтобы иконка удаления была только на созданных вами карточках, реализуйте функциональность удаления карточки. Карточка должна удаляться, если в попапе удаления карточки пользователь нажал «Да». Чтобы удалить карточку, отправьте DELETE-запрос. Вместо cardId в URL нужно подставить параметр карточки, которую нужно удалить. _id каждой карточки есть в её JSON.
  _deleteItem(_id) {
    return fetch(`${this.baseUrl}/v1/cohort-14/cards/${_id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
        })
  }



  // заменить данные пользователя аватар   Чтобы сменить аватар, отправьте такой PATCH-запрос: В теле запроса передайте JSON с единственным свойством — avatar. Это свойство должно хранить ссылку на новый аватар. Если отправить не ссылку, сервер вернёт ошибку. 
  patchUserAvatar(avatar) {
    return fetch(`${this.baseUrl}/v1/cohort-14/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
      })
  }


// получить данные пользователя
  getUserInfo() {  
    return fetch(`${this.baseUrl}/v1/cohort-14/users/me`, {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
        })
  }


  //Отредактированные данные профиля должны сохраняться на сервере. Для этого отправьте запрос методом PATCH:  В заголовках запроса, кроме токена, необходимо отправить Content-Type, а в теле — JSON с двумя свойствами — name и about. Значениями этих свойств должны быть обновлённые данные пользователя
  patchUserInfo(name,
    about) {
    return fetch(`${this.baseUrl}/v1/cohort-14/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
      })
  }


  // залайкать карточку Чтобы лайкнуть карточку, отправьте PUT-запрос:
// PUT https://mesto.nomoreparties.co/v1/cohortId/cards/likes/cardId
  addLikeItem() {
    return fetch(`${this.baseUrl}/v1/cohort-14/cards/likes/${_id}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
      })
  }


  // удалить лайк 
deleteLikeItem() {
    return fetch(`${this.baseUrl}/v1/cohort-14/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
      })
  }
}