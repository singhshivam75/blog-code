# BlogCode – Backend

This is the **backend** for the BlogCode application, a full-featured blog platform. It handles user authentication, blog CRUD operations, likes, comments, image uploads, and protected APIs using JWT.

---

## Features

### ✅ User Authentication
- Register and login with secure password hashing (bcryptjs)
- JWT token-based authentication
- Middleware-protected routes

### 📝 Blog Features
- Create, update, delete blogs
- Upload and serve blog images (via Multer)
- Hide/unhide blogs instead of deleting
- Pagination support for listing

### ❤️ Likes & 💬 Comments
- Users can like/unlike blogs
- Add and fetch comments on blogs
- See who liked or commented

### 🔒 Route Protection
- Protected routes using middleware to verify JWT tokens
- Only the blog owner can update/delete/hide their own blogs

### 🌐 CORS + Environment Config
- CORS enabled for frontend access
- Uses `.env` file for configuration
- Logs clean errors via centralized error handler

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT (jsonwebtoken)**
- **Joi** (validation middleware)
- **Multer** (image upload)
- **bcryptjs** (password hashing)
- **dotenv**, **http-errors**, **cors**, **nodemon**

---


## 📦 Installation & Setup

### Prerequisites
- Node.js v22+
- MongoDB running locally or cloud (MongoDB Atlas)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/blog-backend.git
cd blog-backend

# 2. Install dependencies
npm install

# 3. Create a .env file in root with the following:

# 4. Start the server (nodemon for dev)
npm start