<p align="center">
  <img src="" alt="EduMaster API Logo" width="300"/>
</p>


# 🚀 EduMaster API — Modular Node.js RESTful Backend

EduMaster API is a scalable and modular backend built using **Node.js**, **Express**, and **MongoDB**.  
This project provides a clean MVC structure, versioned routing, JWT authentication, course management, categories, newsletters, menus, tickets, orders, and more — suitable for LMS platforms and educational SaaS systems.

---

## 🔥 Key Features

- 🔐 JWT Authentication & Role-based Authorization  
- 📂 Modular MVC Architecture  
- 🌍 CORS Support + Secure Middlewares  
- 🌱 Environment-based configuration  
- 🗂 Versioned API (`/v1/...`)  
- 📦 MongoDB + Mongoose Integration  
- 📰 Courses, Articles, Menus & Categories  
- 🎟 Full Ticketing System  
- 💬 Comments + Contact Form Handling  
- 🚀 Ready for Scaling & Production Deployment

---

## 📂 Project Structure

```

├── controllers
│   └── v1
├── middleware
├── models
├── routes
│   └── v1
├── validators
├── utils
├── public
├── app.js
└── server.js

````

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|--------|
| Node.js | Backend Runtime |
| Express.js | Server Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Auth System |
| Body-parser | Request Parsing |
| CORS | Security Layer |

---

## 📥 Installation

```bash
git clone https://github.com/Mohammad-JBM/EduMaster-API-Modular-Node.js-RESTful-Backend
cd EduMaster-API-Modular-Node.js-RESTful-Backend
npm install
````

---

## ▶ Run the Project

### **Development Mode**

```bash
npm run dev
```

---

## ⚙ Environment Variables

Create a `.env` file like this:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mohammadjbm
JWT_SECRET=YOUR_SECRET_KEY
AUTH_USER=YOUR_EMAIL
AUTH_PASS=YOUR_APP_PASSWORD
```
---

## 📌 Example Routes

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| POST   | `/v1/auth/login`  | Login user      |
| GET    | `/v1/course`      | Get all courses |
| POST   | `/v1/newsletters` | Add email       |
| GET    | `/v1/articles`    | Fetch articles  |
| POST   | `/v1/tickets`     | Create ticket   |

---

## 📩 Contact

**Developer:** Mohammad JBM

**Email:** [mohammadjbm1385@gmail.com](mailto:mohammadjbm1385@gmail.com)

**GitHub:** [https://github.com/Mohammad-JBM](https://github.com/Mohammad-JBM)

---

## ⭐ Support

If you find this project useful, please give it a **star** ⭐ on GitHub!

---

## 📄 License

This project is licensed under the **MIT License**.
