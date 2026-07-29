<div align="center">

# 🎓 VideoBelajar API

Backend REST API for **VideoBelajar**, an online learning platform that provides authentication, course management, enrollment, and order processing.

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-4A4A55?style=for-the-badge)
![ES Modules](https://img.shields.io/badge/ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</p>

</div>

---

## 📖 About

VideoBelajar API is the backend service for an online learning platform. It provides authentication, course management, enrollment, and order processing using **Express.js**, **Prisma ORM**, and **MySQL**.

---

##  Features

- 🔐 JWT Authentication
- 👤 Role-Based Access Control (Admin, Instructor, Student)
- 📚 Course Management (CRUD)
- 📂 Module Management
- 🎥 Video Lesson Management
- 📝 Student Enrollment
- 💳 Order & Payment Management
- ⚡ Prisma ORM Integration
- 🛡️ Protected Routes & Centralized Error Handling

---

##  Tech Stack

| Category | Technology |
| :------- | :--------- |
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Prisma |
| Database | MySQL |
| Authentication | JWT |
| Password Hashing | Bcrypt |
| Module System | ES Modules |

---

## 📁 Project Structure

```text
videobelajar-be
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

---

##  Authentication

All protected endpoints require a JWT token.

```http
Authorization: Bearer <token>
```

---

##  API Modules

- Authentication
- Users
- Courses
- Enrollments
- Orders

---

##  Available Scripts

```bash
npm run dev
npm start
```

---

<div align="center">

### Async...
### Asynchronous...
### Promise pending...
### Life mysterious.

</div>