const express = require('express');
const router = express.Router();
const communityForumController = require('../controllers/communityForumController');

// Route to add a new post
router.post('/community', communityForumController.addPost);

// Route to fetch all posts
router.get('/community', communityForumController.getAllPosts);

module.exports = router;
