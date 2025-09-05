const blogService = require('../services/blogService');

// Create Blog
exports.createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog({
      title: req.body.title,
      description: req.body.description,
      file: req.file,
      userId: req.user.userId,
      isPublished: req.body.isPublished,
    });

    res.status(201).json({
      status: 'success',
      message: 'Blog created successfully',
      blog,
    });
  } catch (err) {
    next(err);
  }
};

// togglePublishStatus 
exports.togglePublishStatus = async (req, res, next) => {
  try {
    const blog = await blogService.togglePublishStatus({
      blogId: req.params.id,
      userId: req.user.userId,
    });

    res.status(200).json({
      status: 'success',
      message: `Blog is now ${blog.isPublished ? 'published' : 'unpublished'}`,
      blog,
    });
  } catch (err) {
    next(err);
  }
};

// Get Blogs
exports.getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await blogService.getPaginatedBlogs({ page, limit });

    res.status(200).json({
      status: 'success',
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

// Get blog by Id
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.status(200).json({ status: 'success', blog });
  } catch (err) {
    next(err);
  }
};

// Get auther blogs
exports.getMyBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const blogs = await blogService.getBlogsByAuthor(req.user.userId, page, limit);
    const total = await blogService.countBlogsByAuthor(req.user.userId);

    res.status(200).json({
      status: 'success',
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// Update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updated = await blogService.updateBlog({
      id: req.params.id,
      userId: req.user.userId,
      title: req.body.title,
      description: req.body.description,
      image,
    });

    res.status(200).json({
      status: 'success',
      message: 'Blog updated',
      blog: updated,
    });
  } catch (err) {
    next(err);
  }
};

// Delete blog
exports.deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog({
      id: req.params.id,
      userId: req.user.userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'Blog deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// search blogs
exports.getSearchBlogs = async (req, res, next) => {
  try {
    const query = req.query.query || '';

    if (!query.trim()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Search query is required',
      });
    }

    const blogs = await blogService.searchBlogs(query);

    res.status(200).json({
      status: 'success',
      blogs,
    });
  } catch (err) {
    next(err);
  }
};
