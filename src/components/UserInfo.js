export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._nameEl = document.querySelector(profileNameSelector);
    this._descriptionEl = document.querySelector(profileDescriptionSelector);
  }
  getUserInfo() {
    // returns object with user info
    return {
      name: this._nameEl.textContent,
      description: this._descriptionEl.textContent,
    };
  }
  setUserInfo(name, description) {
    //adds data to the page after profileForm submit
    this._nameEl.textContent = name;
    this._descriptionEl.textContent = description;
  }
}
