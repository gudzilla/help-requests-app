# Проект сайта с запросами о помощи для пожилых людей (React/TS/MUI/Redux)

Проект с логином в личный профиль. После входа попадаете на главную страницу - это каталог запросов о помощи с поиском и фильтрами. Есть возможность добавлять запросы в избранное. 

[ССЫЛКА НА ДЕПЛОЙ](https://help-requests-catalog.vercel.app/)

## Cтак

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK%20Query-9925ec?style=for-the-badge&logo=redux)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Функционал

- **Логин** с помощью тестовых профилей
- **Каталог запросов** с поиском, фильтрами и пагинацией.
- На **карточках запроса** есть конопка "добавить в избранное" в виде звездочки
- Клик по карточке откроет страницу этого запроса
- **Меню профиля** открывается в строке навигации
- **Страница профиля** имеет вкладку с избанными запросами
- **Кнопка ВОЙТИ** отправляет запрос к API `api/contribution`

В проекте обрабатываются ошибки и пустые результаты с помощью UI компонент и тост-нотификаций

### Список экранов:

- логин
- каталог запросов о помощи
- страница одного запроса
- страница профиля юзера

## Скриншоты проекта

**Логин**

<img alt='Страница логина' src='./src/assets/forReadme/1-Login.png'>

**Каталог запросов**
<img alt='Запросы' src='./src/assets/forReadme/2-Requests-Catalog.png'>

**Добавить в избранное**
<img alt='Запросы' src='./src/assets/forReadme/2.2-Add-Favourote.png'>

**Меню в хедере**
<img alt='Запросы' src='./src/assets/forReadme/3.3-Menu.png'>

**Страница Конкретного Запроса**
<img alt='Запросы' src='./src/assets/forReadme/3-Request-Page.png'>

**Страница Профиля (1-я вкладка)**
<img alt='Запросы' src='./src/assets/forReadme/4-Profile-tab-1.png'>

**Страница Профиля (2-я вкладка)**
<img alt='Запросы' src='./src/assets/forReadme/4-Profile-tab-2.png'>

**Страница Профиля (3-я вкладка)**
<img alt='Запросы' src='./src/assets/forReadme/4-Profile-tab-3.png'>

## Обработки

**Ошибки**
<img alt='Запросы' src='./src/assets/forReadme/Catalog-Error.png'>

**Нет результатов**
<img alt='Запросы' src='./src/assets/forReadme/Catalog-no-results.png'>

**Тосты**
<img alt='Запросы' src='./src/assets/forReadme/toast-notifications.png'>


## Как запустить локально

### Установка зависимостей

```js
npm install

// или

 yarn
```

### запуск локального сервера через Vite

```js
npm run dev

// или

 yarn
```

### Задание взято с ["Благотворительного React-ивента" 2024](https://github.com/nat-davydova/charity_event_back_oct2024/tree/main?tab=readme-ov-file)
