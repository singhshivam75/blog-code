const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const {
  toggleLike,
  getLikesCount,
  getLikedUsers,
} = require('../controllers/likeController');

const router = express.Router();

router.post('/:id', requireAuth, toggleLike);
router.get('/:id/count', getLikesCount);
router.get('/:id/users', getLikedUsers);

module.exports = router;