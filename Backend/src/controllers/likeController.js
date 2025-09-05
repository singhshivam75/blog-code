const likeService = require('../services/likeService');
const { successResponse } = require('../errors/responseHandler');

// Toggle likes
exports.toggleLike = async (req, res, next) => {
  try {
    const { id: blogId } = req.params;
    const userId = req.user.userId;
    const result = await likeService.toggleLike(blogId, userId);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

// get like counts on a blog
exports.getLikesCount = async (req, res, next) => {
  try {
    const { id: blogId } = req.params;
    const result = await likeService.getLikesCount(blogId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// get users who liked on a post
exports.getLikedUsers = async (req, res, next) => {
  try {
    const { id: blogId } = req.params;
    const result = await likeService.getLikedUsers(blogId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
