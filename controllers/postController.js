

let posts = [
    {id:1, title: "post One"},
    {id:2, title: "post Two"},
    {id:3, title: "post Three"},
]

//get post api/posts
export const getPosts = (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!isNaN(limit) && limit > 0) {
        return res.json(posts.slice(0, limit))
    }
    res.json(posts)

}

//get single post api/posts/:id

export const getPost = (req, res, next) => {
    
    let id = parseInt(req.params.id)
    let post = posts.find((post) => post.id === id);
    if (!post) {
       const error = new Error(`A post with id of ${id} was not found`);
    //    error.status = 404;
       return next(error)
    }
    res.status(200).json(post)
}

//add post post api/posts
export const addPost = (req, res) => {
    let newPost = {
        id: posts.length + 1,
        title: req.body.title
    };
    if(!newPost.title) {
        return res.status(404).json({message:'please enter title'})
    }
    posts.push(newPost)
    res.status(200).json(posts)
}

//edit post put api/posts/:id
export const editPost = (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id)
    let post = posts.find((post) => post.id === id);
    if(!post) {
        return res.status(404).json({message: `A post with the id of ${id} was not found`})
    }
    post.title = req.body.title;
    res.status(200).json(posts)
}


//delete post api/posts/:id

export const deletePost = (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id)
    let post = posts.find((post) => post.id === id);
    if(!post) {
        return res.status(404).json({message: `A post with the id of ${id} was not found`})
    }
    posts = posts.filter((post) => post.id !==id)
    res.status(200).json(posts)
}