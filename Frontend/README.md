# BlogCode – Frontend

**BlogCode** is a modern full-stack blog application. This repository contains the **frontend** built using React.js (v19), Tailwind CSS, Material UI (MUI), Axios, React Router, and other modern libraries.

## 🚀 Live Features (Frontend)

### 🔐 Authentication
- Login and Signup with JWT support.
- Context-based authentication state.
- Navbar updates automatically after login/logout.

### 📚 Blog System
- View all blogs on the homepage.
- Create, edit, delete your own blogs.
- Hide/unhide your blogs from public view without deleting them.
- Responsive blog cards with author name and creation date.

### 🧑‍💼 My Blogs
- View only your own created blogs.
- Edit / delete / hide any of your blogs.
- Pagination with 6 blogs per page.

### 🔍 Search
- Search for blogs using titles or descriptions.
- URL-based search: `/search?query=your-keyword`

### ❤️ Engagement
- Like and comment on blogs.
- See total likes/comments and names of people who interacted.

### 🧭 Navigation
- Sidebar navigation on the homepage.
- Routes for Home, My Blogs, Create Blog, Profile, Logout, etc.
- Protected routes using `ProtectedRoute`.

### 📱 Responsive Design
- Fully responsive for mobile and desktop.
- Clean and modern layout using Tailwind + MUI.

---

## 🛠️ Tech Stack

- **React.js** 19.x
- **React Router DOM** 7.x
- **Tailwind CSS** 4.x
- **Material UI (MUI)** 7.x
- **Axios** – HTTP requests
- **React Toastify** – Notifications
- **React Icons** – UI Icons
- **Vite** – Fast bundler
- **ESLint** – Linting


## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Backend running on default port (example: http://localhost:8050)

### Steps

```bash
# 1. Clone the repository
git clone <githublink>
cd blog-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
