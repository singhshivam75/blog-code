const commentDao = require("../daos/commentDao");
const blogDao = require("../daos/blogDao");

exports.addComment = async (blogId, userId, text) => {
  const blog = await blogDao.findBlogById(blogId);
  if (!blog) throw new Error("BLOG_NOT_FOUND");

  return commentDao.createComment({
    blog: blogId,
    user: userId,
    text: text.trim(),
  });
};

exports.getComments = (blogId) => {
  return commentDao.findCommentsByBlogId(blogId);
};

exports.getCommentCount = (blogId) => {
  return commentDao.countCommentsByBlogId(blogId);
};

exports.deleteComment = async (commentId, userId) => {
  const comment = await commentDao.findCommentById(commentId);
  if (!comment) throw new Error("COMMENT_NOT_FOUND");

  const isCommentOwner = comment.user.toString() === userId;
  const isBlogAuthor = comment.blog.author.toString() === userId;

  if (!isCommentOwner && !isBlogAuthor) throw new Error("NOT_AUTHORIZED");

  return commentDao.deleteCommentById(commentId);
};
