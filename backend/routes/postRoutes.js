const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
