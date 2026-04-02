# 🚀 SERN Fullstack Template

A **production-grade fullstack boilerplate** built with **SERN (Sequelize, Express, React, Node.js)** following modern backend architecture, security best practices, and scalable design patterns.

This project is structured for **real-world applications**, focusing on maintainability, security, logging, and extensibility.

---

## 📌 Core Features

### 🔐 Authentication & Authorization

* JWT Authentication (stored in HTTP-only cookies)
* Secure login & logout flow
* Role-Based Access Control (RBAC)
* Permission-based authorization middleware
* Protected routes with layered security

---

### 🔑 Password & User Security

* Strong password validation using RegEx
* Bcrypt hashing with configurable salt rounds
* Sequelize hooks:

  * `beforeCreate`
  * `beforeUpdate`
  * `beforeBulkUpdate`
* Password excluded from responses (`toJSON` override)
* Secure login flow (no user enumeration leaks)

---

### 🛡️ Security Layer

* `helmet()` for HTTP security headers
* `compression()` for optimized responses
* Rate limiting (Login & Signup protection)
* HTTP-only cookies (XSS protection)
* SameSite cookies (CSRF mitigation)

---

### 📊 Logging System (Advanced)

#### ✅ Winston Logging

* Structured JSON logs
* Log files:

  * `combined.log` → all logs
  * `error.log` → only errors
* Environment-aware logging
* Console logs (development only)

#### 📡 Request Logging

* Tracks incoming HTTP requests
* Helps debug API usage and performance

#### 🧾 Audit Logging

* Tracks critical user/system actions
* Useful for debugging + compliance

---

### ⚙️ Backend Architecture

* MVC + Service + Repository pattern
* Clean separation of concerns
* Middleware-based flow
* Centralized error handling (`ApiError`, `ApiResponse`)
* Async error wrapper (`asyncHandler`)

---

### 🗄️ Database (Sequelize + MySQL)

* ORM-based modeling
* Validation at model level
* Lifecycle hooks
* Environment-based sync strategies

---

### 🌐 API Design

#### ✅ API Versioning

* Versioned routes: `/api/v1`
* Future-ready for backward compatibility

#### ✅ Available Endpoints

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| GET    | `/`                     | Server test route |
| GET    | `/api/v1/health`        | Health check API  |
| POST   | `/api/v1/auth/register` | Register user     |
| POST   | `/api/v1/auth/login`    | Login user        |
| POST   | `/api/v1/auth/logout`   | Logout user       |
| GET    | `/api/v1/users/profile` | Get user profile  |
| GET    | `/api/v1/users/admin`   | Admin-only route  |

---

### ⚛️ Frontend (React Client)

* Separate `client/` folder
* Ready for API integration
* Authentication-ready structure
* Scalable component-based architecture

---

## 📁 Project Structure

```
root/
│
├── client/                 # React frontend
│
├── server/
│   ├── src/
│   │   ├── config/         # Logger, roles, configs
│   │   ├── constants/      # App constants
│   │   ├── controllers/    # Route handlers
│   │   ├── logs/           # Log files (Winston)
│   │   ├── middlewares/    # Auth, rate limit, error
│   │   ├── models/         # Sequelize models
│   │   ├── repositories/   # DB abstraction layer
│   │   ├── routes/         # API routes (v1)
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helpers (ApiError, etc.)
│   │   ├── validations/    # Input validation logic
│   │   ├── app.js          # Express app config
│   │   └── index.js        # Entry point
│   │
│   └── .env
│
└── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Clone Repo

```bash
git clone https://github.com/your-username/sern-fullstack-template.git
cd sern-fullstack-template
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env`:

```env
PORT=5000
NODE_ENV=development

DB_NAME=your_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost

JWT_SECRET=your_secret
BCRYPT_ROUNDS=10
```

Run server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🧠 Key Engineering Concepts

* Service Layer Pattern
* Repository Pattern
* Middleware Architecture
* API Versioning Strategy
* Secure Cookie-Based Authentication
* Structured Logging & Monitoring
* Role & Permission-based Access Control

---

## 🏗️ Production-Ready Highlights

* Clean architecture (scalable & maintainable)
* Strong security practices
* Advanced logging (request + audit + error)
* Versioned API design
* Modular codebase (easy to extend)

---

## 🚀 Future Enhancements

### 🔐 Auth

* Refresh tokens
* Email verification (OTP)
* Forgot/reset password

### 📊 Monitoring

* ELK stack integration
* Sentry error tracking

### ⚡ Performance

* Redis caching
* Query optimization

### 📦 DevOps

* Docker setup
* CI/CD pipelines
* Deployment configs

### 📡 API

* Swagger documentation
* Pagination, filtering, sorting

### ⚛️ Frontend

* State management (Redux/Zustand)
* UI library integration

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📜 License

MIT License

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
