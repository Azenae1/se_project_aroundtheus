export default class Section {
  constructor(renderer, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      console.log(element);
      this._container.append(element);
    });
  }

  addItem({ name, link, id }) {
    const element = this._renderer({ name, link, id });
    this._container.prepend(element);
  }
}
