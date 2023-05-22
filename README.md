# Fiter

Diet planner app. Inspired by the popular fitatu app. Fiter is an application that allows users to track their daily consumption, including the amount of calories consumed, protein, fat, carbohydrates

## Table of Contents

[Features](#Features)  
[Technologies](#Technologies)  
[Installation](#Installation)  
[Screenshots](#Screenshots)

## Features

- User can:
  - Account login
  - Ability to create a private account
  - Search for products from the database and check the nutritional values
  - Add products to list by entering the value
  - Remove products from the list
  - Add non-existent products to the database
  - Edit products in list
  - Opening the help menu
- Administrator can:
  - Account login
  - Supervise what users add to the database
  - Remove products from the database
  - Add products to the database
  - Search for products from the database
- Responsive layout
- Maintaining UI/UX rules, Simple to use

## Technologies

- Frontend

  - HTML, CSS, Type Script
  - React (Hooks, Router, Toast)

- Backend

  - Firebase

- NPM's
  - react 18.2.0
  - react-hot-toast 2.4.0
  - typescript 4.9.5
  - react-router-dom 6.0.2
  - uuid 9.0.0
  - framer-motion 10.10.0
  - firebase 9.19.1

## Installation

#### 1. Install [Node.js](https://nodejs.org/en/) and [GIT](https://git-scm.com/)

#### 2. Clone the repo

#### 3. Create a Firestore Database in [Firebase](https://firebase.google.com/)

#### 4. Create a **firebaseConfig.ts** api file with your Firebase settings and put it in ./src

example src/firebaseConfig.ts

```bash
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
```

#### 5. Enter the client directory and type

```bash
npm install
```

#### 6. Start the application

```bash
npm start
```

## Screenshots

Click on the link to see the full responsive mockup of the application [Figma Mockups](https://www.figma.com/file/ClU4UJt9C6FYFf5RbK1d2S/FITER?type=design&node-id=0%3A1&t=qAKAE6cEq9Qq4mHm-1)

### Registration form

![register](https://i.postimg.cc/YSjpqjzC/register.jpg)

### Login form

![login](https://i.postimg.cc/T3td6nms/login.jpg)

### User dashboard

![user_dashboard](https://i.postimg.cc/ZnzZcHtW/home.jpg)

### Search and add products

![seeker_and_add](https://i.postimg.cc/ZRd4pggk/seeker.jpg)

### Add product to database

![add_product](https://i.postimg.cc/Wb6p5B4T/add.jpg)

### Administrator panel

![admin_panel](https://i.postimg.cc/cC7W530X/admin.jpg)

## To see the application placed on the Azure server, contact me via e-mail

```
contact@bartekgrzesik.pl
```
