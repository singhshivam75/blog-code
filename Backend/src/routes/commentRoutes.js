const express = require('express');
const validate = require('../middlewares/validateMiddleware');
const requireAuth = require('../middlewares/requireAuth');
const { addComment, getComments, deleteComment, getCommentCount } = require('../controllers/commentController');
const { addCommentSchema } = require('../schemas/commentSchema');

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', validate(addCommentSchema), requireAuth, addComment);
router.get("/blogs/:id/comments/count", getCommentCount);
router.delete("/comments/:commentId", requireAuth, deleteComment);

module.exports = router;
