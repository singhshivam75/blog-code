const mongoose = require("mongoose");
const commentService = require("../services/commentService");

// Add comment
exports.addComment = async (req, res, next) => {
  const { id: blogId } = req.params;
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim().length < 1) {
    return res.status(400).json({ status: "error", message: "Comment text is required" });
  }

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({ status: "error", message: "Invalid blog ID" });
  }

  try {
    const comment = await commentService.addComment(blogId, req.user.userId, text);
    res.status(201).json({ status: "success", message: "Comment added", comment });
  } catch (err) {
    if (err.message === "BLOG_NOT_FOUND") {
      return res.status(404).json({ status: "error", message: "Blog not found" });
    }
    next(err);
  }
};

// Get all comments on a post
exports.getComments = async (req, res, next) => {
  const { id: blogId } = req.params;

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({ status: "error", message: "Invalid blog ID" });
  }

  try {
    const comments = await commentService.getComments(blogId);
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// get count of comments
exports.getCommentCount = async (req, res, next) => {
  const { id: blogId } = req.params;
  try {
    const count = await commentService.getCommentCount(blogId);
    res.status(200).json({ blogId, totalComments: count });
  } catch (err) {
    next(err);
  }
};

// delete comments
exports.deleteComment = async (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.isValidObjectId(commentId)) {
    return res.status(400).json({ status: "error", message: "Invalid comment ID" });
  }

  try {
    await commentService.deleteComment(commentId, req.user.userId);
    res.status(200).json({ status: "success", message: "Comment deleted successfully" });
  } catch (err) {
    if (err.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({ status: "error", message: "Comment not found" });
    }
    if (err.message === "NOT_AUTHORIZED") {
      return res.status(403).json({ status: "error", message: "Not authorized to delete this comment" });
    }
    next(err);
  }
};