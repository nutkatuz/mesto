# [Mesto](https://nutkatuz.github.io/mesto/) - проект в рамках обучения по профессии Frontend.

### Описание проекта

Предложено сверстать интерактивную страницу (разработка клиентской части в браузере) с использованием уже известных технологий из [предыдущих проектов](https://github.com/nutkatuz/Russian-travel), а также ванильного __JavaScript__ для изменения разметки, стилей и поведения элементов страницы.  

Сайт представляет собой одностраничный профиль пользователя с возможностями:
* редактировать информацию пользователе;
* добавить карточки с картинками, удалить свои (не чужие);
* поставить отметку "лайк";
* открыть картинки в полный размер (лайтбокс). 

 

### Технологии и обновления

#### JS

Большая часть логики написана на JS. Здесь и работа с формами, и активные кнопки, закрытие модальных окон через клавишу "Esc" и по клику в любое место за окном. Добавлена "живая" валидация на JavaScript. Функциональное программирование было заменено на объектно-ориентированное, каждый класс в отдельном модуле.  

Хочу отметить, что закрытие-открытие диалоговых окон с toggle не подходит для этой работы. при закрытии окна с неправильными данными пока оно гаснет, можно заметить, как кнопка меняет свое состояние с белой на черную, только потом гаснет окончательно. А когда быстро клацаешь по оверлею, окно мигает, а не закрывается. Это происходит из-за установленной отсрочки для плавного выцветания, по факту окно еще остается открытым во время кликов. Заменила первоначальный код:  
```
const togglePopup = function (somepopup) {
    somepopup.classList.toggle('popup_is-opened')
    resetFormState(somepopup, config)
}
```
Создание функции renderLoading (isLoading) необоснованно раздувает код. Информирование пользователя реализовано в работе экономичнее. Прелоадер можно было красиво вызывать в промисе в finally, но закрытие окна должно происходить в then, чтобы не вводить пользователя в заблуждение. В таком случае пришлось бы передавать в функцию дополнительные аргументы, устанавливать дополнительный поиск элементов на странице.
Кнопки на странице многофункциональны. Например, кнопка "Да" в окне подтверждения может запускать любую функцию, которую мы ей передадим в параметре. В данной работе id карточки прокидывается через публичный метод в окно подтверждения. Этот метод принимает функцию, которую вызовет при сабмите. А значение handleDeleteClick прокидывается в класс карточки через конструктор. Таким образом сильная связь между классами отсутствует, а id карточки передается.
Кнопка лайка на карточке может выполнять 2 группы функций в зависивости от определенного условия. При создании новой карточки мы передаем эти обработчики в конструктор класса карточки, внутри класса Card при генерации карточки устанавливается слушатель лайка, обработчик которого и вызывает приватный метод с условием внутри. В зависимости от выполнения условия, срабатывает та или иная группа функций. Можно было передавать один колбэк с условием вместо двух: 
```
handleLikeClick: () => {
    const isLiked = card.isLiked();
    if (isLiked) {
        api.removeLike(item._id)
        .then(item => card.updateLikesCount(item.likes))
        .catch((err) => {
        console.log(`Ошибка ${err}`)
        })
    } else {
        api.addLike(item._id)
        .then(item => card.updateLikesCount(item.likes))
        .catch((err) => {
        console.log(`Ошибка ${err}`)
        })
    }
},
```
Но этот код не вошел в работу, потому что ухудшает читабельность кода. Использование метода find для обнаружения совпадений в массиве вместо !!this._likes.forEach(like => {if(like._id.includes(this.userId)){...classList.add...}}) выбрано из-за лучшего быстродействия.
Карточки могут загрузиться правильно только после загрузки данных пользователя, но лучше следующий код заменить на Promise.all для сокращения кода: 
```
api.getUserData()
    .then((res) => {
        userInfo.setUserInfo(res)
        userId = res._id
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`)
    })
    
api.getInitialItems()
    .then((res) => {
        section.renderItems(res)
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`)
    })
```


#### CSS

Плавное открытие-закрытие окон реализовано на CSS. Интересно, что при изменении информации, кнопка рядом с именем не убегает от него и не наступает на соседей. И это при том, что кнопка и имя не имеют общей обёртки. Подвал не задирается при удалении всех карточек, на любом разрешении экрана. Плавные эффекты при наведении и снятии курсора с аватара. При загрузке страницы кнопки не видно.

### Планирование доработок

В планах было адаптировать сайт для плоховидящих людей... сайт с картинками. Пока что я добавила чтение кнопок с экрана (для специализированных программ).  
В планах увеличение производительности сайта.  
______________________________________________________________________________________
Я онлайн в [Telegram](https://t.me/revidovich) :)