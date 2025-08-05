import express from 'express';
const router = express.Router();
import errorHandling  from '../middlewares/error.js';


let posts = [
    {id:1, title: "post One"},
    {id:2, title: "post Two"},
    {id:3, title: "post Three"},
]

//get all posts
router.get('/', (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit))
    }
    res.json(posts)

})

//get single post
router.get('/:id', (req, res, next) => {
    
    let id = parseInt(req.params.id)
    let post = posts.find((post) => post.id === id);
    if (!post) {
       const error = new Error(`A post with id of ${id} was not found`);
       return next(error)
    }
    res.status(200).json(post)
})

router.post('/', (req, res) => {
    let newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if(!newPost.title) {
        return res.status(404).json({message:'please enter title'})
    }
    posts.push(newPost)
    res.status(200).json(posts)
})

router.put('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id)
    let post = posts.find((post) => post.id === id);
    if(!post) {
        return res.status(404).json({message: `A post with the id of ${id} was not found`})
    }
    post.title = req.body.title;
    res.status(200).json(posts)
})

router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id)
    let post = posts.find((post) => post.id === id);
    if(!post) {
        return res.status(404).json({message: `A post with the id of ${id} was not found`})
    }
    posts = posts.filter((post) => post.id !==id)
    res.status(200).json(posts)
})

export default router;