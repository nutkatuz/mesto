// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
import Card from './Card.js'

export default class Section {
    constructor ( {items, renderer}, containerSelector ) {
        this._initialArray = items
        this._renderer = renderer
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.

// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
        this._container = document.querySelector(containerSelector)
    }
    // Содержит публичный метод, который отвечает за отрисовку всех элементов.
    renderItems(){
        this._renderedItems.forEach(item => this._renderer(item));
        // this._renderedItems.forEach((item) => {
        //     new Card(item, '.card-template')
        //  const cardElement = card.generateCard();
        //   this.setItem(cardElement);
        // const cardElement = renderer(item)
        // this._container.append(cardElement)
        // })
    }
    
    // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element){
            // const name = placeInput.value
            // const link = linkInput.value
            // const element = renderer({ name, link })
            this._container.prepend(element)
        
    }
}

