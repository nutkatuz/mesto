export default class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  getInitialItems() {
    return fetch(`${this.baseUrl}/v1/cohort-14/cards`, {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  postItem(item) {
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
  }

  deleteItem(_id) {
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
  }

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
  }

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
  }

  patchUserInfo(name, about) {
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
  }

  addLike(_id) {
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
  }

  removeLike(_id) {
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
  }
}