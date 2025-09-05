// src/api/blogService.js
import API from "./apiClient";

// --- Blog APIs ---
export const getAllBlogs = (page = 1, limit = 5) =>
  API.get("/blog", { params: { page, limit } }).then(res => res.data);

export const getBlogById = (id) =>
  API.get(`/blog/${id}`).then(res => res.data);

export const createBlog = (blogData) =>
  API.post("/blog", blogData, { headers: { "Content-Type": "multipart/form-data" } })
     .then(res => res.data);

export const updateBlogById = (id, blogData) =>
  API.put(`/blog/${id}`, blogData).then(res => res.data);

export const deleteBlogById = (id) =>
  API.delete(`/blog/${id}`).then(res => res.data);

export const getMyBlogs = (page = 1, limit = 5) =>
  API.get("/blog/my-blogs", { params: { page, limit } }).then(res => res.data);

export const togglePublishStatus = (id) =>
  API.patch(`/blog/${id}/toggle-publish`).then(res => res.data);

export const getSearchedBlogs = (query = "", page = 1, limit = 10) =>
  API.get("/blog/search", { params: { query, page, limit } }).then(res => res.data);
