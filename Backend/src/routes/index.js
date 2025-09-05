const express = require('express');
const router = express.Router();

const authRoute = require('./authRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/blog', route: blogRoutes },
  { path: '/comment', route: commentRoutes },
  { path: '/likes', route: likeRoutes },
];

defaultRoutes.forEach((r) => {
  router.use(r.path, r.route);
});

module.exports = router;
