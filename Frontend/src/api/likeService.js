import API from "./apiClient";

export const getLikesCount = (blogId) =>
  API.get(`/likes/${blogId}/count`).then(res => res.data.totalLikes);

export const toggleLike = (blogId) =>
  API.post(`/likes/${blogId}`).then(res => res.data);

export const getLikedUsers = (blogId) =>
  API.get(`/likes/${blogId}/users`).then(res => res.data);
