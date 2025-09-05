// src/api/commentService.js
import API from "./apiClient";

export const getCommentCount = (blogId) =>
  API.get(`/comment/blogs/${blogId}/comments/count`).then(res => res.data.totalComments);

export const getCommentsByBlogId = (blogId) =>
  API.get(`/comment/${blogId}`).then(res => res.data);

export const createComment = (blogId, text) =>
  API.post(`/comment/${blogId}`, { text }).then(res => res.data);

export const deleteComment = (commentId) =>
  API.delete(`/comment/comments/${commentId}`).then(res => res.data);
