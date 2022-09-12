// ------------------Mongoose를 이용한 REST API Express 서버 라우트----------------------------

// const express = require('express');
// const { body } = require('express-validator');

// const feedController = require('../controllers/feed');
// const isAuth = require('../middleware/is-auth');

// const router = express.Router();

// // GET /feed/posts
// router.get('/posts', isAuth, feedController.getPosts);

// // POST /feed/post
// router.post(
//     '/post', 
//     isAuth, 
//     [
//         body('title').trim().isLength({ min: 5 }),
//         body('content').trim().isLength({ min: 5 })
//     ], 
//     feedController.createPost
// );

// router.get('/post/:postId', isAuth, feedController.getPost);

// router.put('/post/:postId', 
//     isAuth, 
//     [
//         body('title').trim().isLength({ min: 5 }),
//         body('content').trim().isLength({ min: 5 })
//     ], 
//     feedController.updatePost
// );

// router.delete('/post/:postId', isAuth, feedController.deletePost);

// module.exports = router;