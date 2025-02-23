# Website with Help Requests for Elderly People (React/TS/MUI/Redux)

[LIVE DEMO LINK](https://help-requests-app.netlify.app/)

Users can access a catalog of help requests with search and filter options. They can contribute by clicking the "Contribute" button on a request card. Additionally, users can add requests to their favorites. The project includes login functionality via test profiles.

## Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK%20Query-9925ec?style=for-the-badge&logo=redux)
![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Features

- **Login** with test profiles
- **Request a catalog** with search, filters, and pagination
- Each **request card** includes "Contribute" and "Add to Favourites" buttons
- Clicking on a card opens the request details page
- **Profile menu** is available in the navigation bar
- **The profile page** has a tab for favorite requests

### What features work via API calls

- authentication
- getting help requests
- getting a single help request by id
- get user information for the profile page
- get a list of favourite requsts
- add/remove request to favourites

The project handles errors and empty search results using UI components and toast notifications.

### List of Pages

- Login
- Help request catalog
- Single request page
- User profile page

## Project UI

**Login Page**
<img alt='Login Page' src='./src/assets/forReadme/1-Login.webp'>

**Request Catalog**
<img alt='Request Catalog' src='./src/assets/forReadme/2-Requests-Catalog.webp'>

**Add to Favorites**

<img alt='Add to Favorites' width='300' src='./src/assets/forReadme/2.2-Add-Favourote.webp'>

**Header Menu**

<img alt='Header Menu' width='300' src='./src/assets/forReadme/3.3-Menu.webp'>

**Single Request Page**
<img alt='Single Request Page' src='./src/assets/forReadme/3-Request-Page.webp'>

**Profile Page (Tab 1)**
<img alt='Profile Page (Tab 1)' src='./src/assets/forReadme/4-Profile-tab-1.webp'>

**Profile Page (Tab 2)**
<img alt='Profile Page (Tab 2)' src='./src/assets/forReadme/4-Profile-tab-2.webp'>

**Profile Page (Tab 3)**
<img alt='Profile Page (Tab 3)' src='./src/assets/forReadme/4-Profile-tab-3.webp'>

### Error Handling

**Errors**
<img alt='Errors' src='./src/assets/forReadme/Catalog-Error.webp'>

**No Results Found**
<img alt='No Results Found' src='./src/assets/forReadme/Catalog-no-results.webp'>

**Toast Notifications**

<img alt='Toast Notifications' width='300' src='./src/assets/forReadme/toast-notifications.webp'>

## How to Run Locally

### Install Dependencies

```js
npm install

// or

yarn
```

### Start Local Server with Vite

```js
npm run dev

// or

yarn
```

#### Design and idea taken from [‘Charity React event’ 2024](https://github.com/nat-davydova/charity_event_back_oct2024/tree/main?tab=readme-ov-file)
