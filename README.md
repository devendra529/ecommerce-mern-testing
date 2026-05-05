# 🛒 ShopKart

A full-stack eCommerce web application built using the MERN stack, along with API and UI testing.
This project was created to practice real-world development and testing skills required for SDET roles.

---

## 🚀 What this project does

ShopKart is a simple eCommerce platform where users can:

* Sign up and log in
* Browse products
* Add items to cart
* Place orders
* View their order history

Along with building the app, I also focused on testing:

* API testing using Postman
* UI automation using Selenium
* Basic data validation

---

## 🧰 Tech Stack

* **Frontend:** React.js, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **API Testing:** Postman, REST Assured (Java)
* **UI Testing:** Selenium WebDriver (Java), TestNG
* **Build Tool:** Maven

---

## 📁 Project Structure

```bash
shopkart/
├── backend/
├── frontend/
└── tests/
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB running locally
* Java 11+
* Maven
* Chrome browser

---

### Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server will run at:
http://localhost:5000

---

### Frontend setup

```bash
cd frontend
npm install
npm start
```

App will run at:
http://localhost:3000

---

## 🧪 Testing

### API Testing

* Open Postman
* Import the collection from:

  ```
  tests/api/
  ```
* Run all requests to validate APIs

---

### UI Testing

```bash
cd tests/selenium
mvn test
```

Make sure backend and frontend are running before executing tests.

---

## 🔗 Main API Routes

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Products

* GET `/api/products`
* GET `/api/products/:id`

### Cart (requires login)

* GET `/api/cart`
* POST `/api/cart/add`
* PUT `/api/cart/update`
* DELETE `/api/cart/remove/:id`

### Orders (requires login)

* POST `/api/orders`
* GET `/api/orders/myorders`

---

## 🎯 What I learned

* How to build and structure a full-stack application
* Writing clean REST APIs
* Handling authentication using JWT
* Testing APIs and validating responses
* Automating UI flows using Selenium
* Debugging real-world issues

---

## 👨‍💻 Author

Devendra Pratap Singh

---

## 📌 Note

This project is mainly focused on learning:

* Backend + frontend integration
* API testing
* Automation testing

---

