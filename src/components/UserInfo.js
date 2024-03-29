export default class UserInfo {
  constructor(
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector
  ) {
    this._nameEl = document.querySelector(profileNameSelector);
    this._descriptionEl = document.querySelector(profileDescriptionSelector);
    this._avatarEl = document.querySelector(profileAvatarSelector);
  }
  getUserInfo() {
    // returns object with user info
    return {
      name: this._nameEl.textContent,
      description: this._descriptionEl.textContent,
      avatar: this._avatarEl.textContent,
    };
  }
  setUserInfo(name, description) {
    //adds data to the page after profileForm submit
    this._nameEl.textContent = name;
    this._descriptionEl.textContent = description;
  }
  setUserAvatar(avatar) {
    this._avatarEl.src = avatar;
  }
}
