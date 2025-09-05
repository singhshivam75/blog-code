const Like = require('../models/like');
const Blog = require('../models/blog');

exports.findBlogById = (blogId) => Blog.findById(blogId);

exports.findLike = (blogId, userId) =>
  Like.findOne({ blog: blogId, user: userId });

exports.deleteLike = (like) => like.deleteOne();

exports.createLike = (blogId, userId) =>
  Like.create({ blog: blogId, user: userId });

exports.countLikes = (blogId) =>
  Like.countDocuments({ blog: blogId });

exports.findLikedUsers = (blogId) =>
  Like.find({ blog: blogId }).populate('user', 'username email');
