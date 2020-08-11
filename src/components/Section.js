// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items; // Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
        this._renderer = renderer;// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
        // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
        this._containerSelector = containerSelector;
    }
    // Содержит публичный метод, который отвечает за отрисовку всех элементов.
    renderItems() {//верно
        this._renderedItems.forEach(item => { this._renderer(item) });
    }
    // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {//верно
        this._containerSelector.prepend(element)
    }
}