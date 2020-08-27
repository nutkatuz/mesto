export default class Section {
    constructor({ renderer }, containerSelector) {
        this._container =  document.querySelector(containerSelector)
        this._renderer = renderer;
    }

    renderItems(items) {
        items.forEach(item => { this._renderer(item) });
    }

    renderItem(element, prepend) {
        if (prepend==='prepend') {
        this._container.prepend(element)
    }else{
        this._container.append(element)}
    }
}
