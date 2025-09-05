const Comment = require("../models/comment");

exports.createComment = (data) => Comment.create(data);

exports.findCommentsByBlogId = (blogId) =>
  Comment.find({ blog: blogId }).populate("user", "username email");

exports.countCommentsByBlogId = (blogId) =>
  Comment.countDocuments({ blog: blogId });

exports.findCommentById = (commentId) =>
  Comment.findById(commentId).populate("blog");

exports.deleteCommentById = (commentId) =>
  Comment.findByIdAndDelete(commentId);
