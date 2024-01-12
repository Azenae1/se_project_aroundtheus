export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _resValidate(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error occured: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._resValidate);
  }
  setUserInfo(info) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    }).then(this._resValidate);
  }
  getUserAvatar() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      { method: "GET", headers: this._headers }
    ).then(this._resValidate);
  }
  setUserAvatar(url) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(url),
      }
    ).then(this._resValidate);
  }
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._resValidate);
  }
  addCard(name, link) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._resValidate);
  }
  deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._resValidate);
  }
  addLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then(this._resValidate);
  }
  deleteLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._resValidate);
  }
}
