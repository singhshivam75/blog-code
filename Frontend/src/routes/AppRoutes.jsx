import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import SearchPage from '../pages/SearchPage';

import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import BlogList from '../features/blogs/BlogList';
import BlogDetail from '../features/blogs/BlogDetail';
import CreateBlog from '../features/blogs/CreateBlog';

import ProtectedRoute from '../pages/ProtectedRoute';
import UpdateBlog from '../features/blogs/UpdateBlog';
// import DeleteBlog from '../features/blogs/DeleteBlog';
import AutherBlogs from '../features/blogs/AutherBlogs';
import Card from '../pages/Card';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/card" element={<Card />} />

      <Route
        path="/create-blog"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-blogs"
        element={
          <ProtectedRoute>
            <AutherBlogs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog/:id/edit"
        element={
          <ProtectedRoute>
            <UpdateBlog />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/blog/:id/delete"
        element={
          <ProtectedRoute>
            <DeleteBlog />
          </ProtectedRoute>
        }
      /> */}

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;