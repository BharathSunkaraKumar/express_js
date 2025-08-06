import express from 'express';
const router = express.Router();
import {getPosts, getPost, deletePost, editPost, addPost} from '../controllers/postController.js'


//get all posts
router.get('/', getPosts)

//get single post
router.get('/:id', getPost)

router.post('/', addPost)

router.put('/:id', editPost)

router.delete('/:id', deletePost)

export default router;