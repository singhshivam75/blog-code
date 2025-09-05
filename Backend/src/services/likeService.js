const mongoose = require('mongoose');
const likeDao = require('../daos/likeDao');
const { AppError } = require('../errors/responseHandler');

exports.toggleLike = async (blogId, userId) => {
  if (!mongoose.isValidObjectId(blogId)) {
    throw new AppError('Invalid blog ID', 400);
  }

  const blog = await likeDao.findBlogById(blogId);
  if (!blog) throw new AppError('Blog not found', 404);

  const existingLike = await likeDao.findLike(blogId, userId);

  if (existingLike) {
    await likeDao.deleteLike(existingLike);
    return { status: "success", message: "Blog unliked" };
  }

  await likeDao.createLike(blogId, userId);
  return { status: "success", message: "Blog liked" };
};

exports.getLikesCount = async (blogId) => {
  if (!mongoose.isValidObjectId(blogId)) {
    throw new AppError('Invalid blog ID', 400);
  }

  const count = await likeDao.countLikes(blogId);
  return { blogId, totalLikes: count };
};

exports.getLikedUsers = async (blogId) => {
  if (!mongoose.isValidObjectId(blogId)) {
    throw new AppError('Invalid blog ID', 400);
  }

  const likes = await likeDao.findLikedUsers(blogId);
  return likes.map(like => like.user);
};
