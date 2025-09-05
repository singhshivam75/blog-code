const createError = require('http-errors');
const blogDao = require('../daos/blogDao');

// Create blog
exports.createBlog = async ({ title, description, file, userId, isPublished }) => {
  if (!title || !description) {
    throw createError(400, 'Title and description are required');
  }

  const image = file ? `/uploads/${file.filename}` : null;  

  return await blogDao.createBlog({
    title,
    description,
    image,
    author: userId,
    isPublished,
  });

};

// toggle publish status
exports.togglePublishStatus = async ({ blogId, userId }) => {

  
  return await blogDao.togglePublishStatus(blogId, userId);
};

// Get all blogs
exports.getAllBlogs = () => blogDao.findAllBlogs();

// Get blog by ID
exports.getBlogById = async (id) => {
  const blog = await blogDao.findBlogById(id);
  if (!blog) throw createError(404, 'Blog not found');
  return blog;
};

// Get my blogs
exports.getBlogsByAuthor = (userId, page, limit) => {
  return blogDao.findBlogsByAuthor(userId, page, limit);
}

// count blogs
exports.countBlogsByAuthor = (userId) => {
  return blogDao.countBlogsByAuthor(userId)
}

// Update blog
exports.updateBlog = async ({ id, userId, title, description, image }) => {
  const blog = await blogDao.findBlogById(id);
  if (!blog) throw createError(404, 'Blog not found');

  const authorId = blog.author._id ? blog.author._id.toString() : blog.author.toString();
  if (authorId !== userId.toString()) {
    throw createError(403, 'You can only update your own blog');
  }

  blog.title = title || blog.title;
  blog.description = description || blog.description;
  blog.image = image || blog.image;

  return await blogDao.saveBlog(blog);
};

// Delete blog
exports.deleteBlog = async ({ id, userId }) => {
  const blog = await blogDao.findBlogById(id);
  if (!blog) throw createError(404, 'Blog not found');

  if (blog.author._id.toString() !== userId) {
    throw createError(403, 'You can only delete your own blog');
  }

  return await blogDao.deleteBlog(blog);
};

// Paginated blogs
exports.getPaginatedBlogs = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [blogs, total] = await Promise.all([
    blogDao.findPaginatedBlogs(skip, limit),
    blogDao.countAllBlogs(),
  ]);

  return {
    blogs,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

// search blog
exports.searchBlogs = async (query) => {
  return blogDao.searchBlogs(query);
};
