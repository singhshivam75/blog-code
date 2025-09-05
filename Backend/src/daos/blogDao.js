const Blog = require('../models/blog');

// Create
exports.createBlog = (data) => Blog.create(data);

// All Blogs
exports.findAllBlogs = () => Blog.find({ isPublished: true }).populate('author', 'username email');

// Find one blog
exports.findBlogById = (id) => Blog.findById(id).populate('author', 'username email');

// Find user's all blogs
exports.findBlogsByAuthor = (authorId, page = 1, limit = 6) => {
  const skip = (page - 1) * limit;
  return Blog.find({ author: authorId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username email');
};

exports.countBlogsByAuthor = (authorId) => {
  return Blog.countDocuments({ author: authorId });
};

// Update 
exports.saveBlog = (blog) => blog.save();

// Delete
exports.deleteBlog = (blog) => blog.deleteOne();

// Only fetch published blogs
exports.findPaginatedBlogs = (skip, limit) =>
  Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username email');

// Only count published blogs
exports.countAllBlogs = () => Blog.countDocuments({ isPublished: true });

// Toggle publish status
exports.togglePublishStatus = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw createError(404, 'Blog not found');

  if (blog.author.toString() !== userId.toString()) {
    throw createError(403, 'You are not authorized to update this blog');
  }

  blog.isPublished = !blog.isPublished;
  return await blog.save();
};

// Search blog
exports.searchBlogs = async (query) => {
  const regex = new RegExp(query, 'i');

  return Blog.find({
    isPublished: true,
    $or: [
      { title: regex },
      { description: regex },
    ],
  }).populate('author', 'username email');
};