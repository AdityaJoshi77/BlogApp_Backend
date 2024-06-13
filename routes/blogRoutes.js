

// creating router instance
const express = require('express');
const router = express.Router();

// importing the BlogPost controllers...
const {getBlog,getBlogById} = require('../controllers/blogControls/getBlog.js');
const {postBlog} = require('../controllers/blogControls/postBlog.js');
const {putBlog} = require('../controllers/blogControls/putBlog.js');
const {deleteBlog} = require('../controllers/blogControls/deleteBlog.js');

// importing like/unlike controllers...
const {hitLike,removeLike} = require('../controllers/likeControls/likes.js');
const {hitDislike,removeDislike} = require('../controllers/likeControls/dislikes.js');

// importing comment controllers...
const {makeComment,deleteComment} = require('../controllers/commentControls/comments.js');


// mapping blog routes to contollers...
router.get('/getblog',getBlog);
router.get('/getBlog/:id',getBlogById);
router.post('/postBlog',postBlog);
router.put('/putBlog/:id',putBlog);
router.delete('/deleteBlog/:id',deleteBlog);

// mapping like/unlike routes to controllers...
router.put('/hitLike/:id',hitLike);
router.put('/removeLike/:id',removeLike);
router.put('/hitDislike/:id',hitDislike);
router.put('/removeDislike/:id',removeDislike);


// mapping comments routes to controllers...
router.post('/makeComment/:id',makeComment);
router.delete('/blogs/:blogId/comments/:commentId', deleteComment);
// router.delete('/deleteComment/:id',deleteComment);
/*
    // TO be done...
*/


// exporting router...
module.exports = router;