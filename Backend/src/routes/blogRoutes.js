const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const upload = require('../middlewares/upload');
const validate = require('../middlewares/validateMiddleware');
const {
  createBlogSchema,
  updateBlogSchema
} = require('../schemas/blogSchema');
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  togglePublishStatus,
  getSearchBlogs,
} = require('../controllers/blogController');

const router = express.Router();

router.get('/my-blogs', requireAuth, getMyBlogs);
router.get('/search', getSearchBlogs);
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', upload.single('image'), validate(createBlogSchema), requireAuth, createBlog);

router.put('/:id', validate(updateBlogSchema), requireAuth, upload.single('image'), updateBlog);
router.delete('/:id', requireAuth, deleteBlog);
router.patch('/:id/toggle-publish', requireAuth, togglePublishStatus);

module.exports = router;