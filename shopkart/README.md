# ShopKart — Full-Stack eCommerce App

A production-style eCommerce web application built as an SDET learning project. Covers frontend, backend, database, REST API testing, and Selenium UI automation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| API Testing | Postman, REST Assured (Java) |
| UI Testing | Selenium WebDriver (Java), TestNG |
| Build Tool | Maven |

---

## Features

- User registration and login with JWT authentication
- Product listing with search and category filter
- Add to cart, update quantity, remove items
- Place orders with shipping address
- Order history per user
- Protected routes (cart and orders require login)

---

## Project Structure

```
shopkart/
├── backend/
│   ├── models/          User, Product, Order schemas
│   ├── routes/          auth, products, cart, orders
│   ├── middleware/       JWT auth check
│   ├── server.js        Entry point
│   └── .env.example     Environment variables template
│
├── frontend/
│   └── src/
│       ├── components/  Navbar, ProductCard
│       ├── context/     AuthContext, CartContext
│       ├── pages/       Home, Login, Register, Products, Cart, Orders
│       └── services/    api.js (Axios wrappers)
│
└── tests/
    ├── api/             Postman collection (.json)
    └── selenium/        Maven project with TestNG
        └── src/test/java/
            ├── pages/   Page Object Model classes
            └── tests/   LoginTest, ApiValidationTest
```

---

## Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB running locally on port 27017
- Java 11+
- Maven 3.8+
- Chrome browser (for Selenium)

---

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server starts at `http://localhost:5000`

Seed sample products:
```
POST http://localhost:5000/api/products/seed
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`

---

### Running API Tests (Postman)

1. Open Postman
2. Import `tests/api/ShopKart_API_Tests.postman_collection.json`
3. Run the collection — tests run in order automatically

---

### Running Selenium + REST Assured Tests

```bash
cd tests/selenium
mvn test
```

Make sure both backend (port 5000) and frontend (port 3000) are running before executing tests.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products/seed | Load sample data |

### Cart (requires token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | View cart |
| POST | /api/cart/add | Add item |
| PUT | /api/cart/update | Update quantity |
| DELETE | /api/cart/remove/:id | Remove item |

### Orders (requires token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Place order |
| GET | /api/orders/myorders | My orders |

---

## Daily Development Log

| Day | Focus | Commits |
|-----|-------|---------|
| Day 1 | Project setup, backend scaffold | feat: initialize backend with express and mongodb |
| Day 2 | Auth APIs (register, login, JWT) | feat: add user auth with bcrypt and jwt |
| Day 3 | Product and order APIs | feat: add product listing and order routes |
| Day 4 | React frontend setup, routing | feat: setup react app with auth context and routing |
| Day 5 | Products, Cart, Orders pages | feat: complete frontend pages with cart functionality |
| Day 6 | Postman API test collection | test: add postman collection with validation tests |
| Day 7 | Selenium automation + README | test: add selenium login tests with page object model |

---

## Author

Built by [Devendra Pratap Singh] as part of SDET role preparation.  
Focus: REST API testing, Selenium automation, full-stack integration.
