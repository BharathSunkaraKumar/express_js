console.log("main")
const output = document.querySelector('#output')
const button = document.querySelector('#get-posts-btn')
const form  = document.querySelector('#add-post-form')

const showPost = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/posts')
        if(!res.ok) {
            throw new Error('failed to fetch Posts')
        }
        const posts = await res.json()

        output.innerHTML = ""
        posts.forEach((post) => {
            const postEl = document.createElement('div');
            postEl.innerText = post.title;
            output.appendChild(postEl)
        })
    } catch (error) {
        console.log('failed to fetch posts:', error)
    }
}

const addPost = async (e) => {
    e.preventDefault()
    const formData = new FormData(this);
    console.log(formData)
    const title = formData.get('title')
    try {
        const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({title})
        })
        if(!res.ok) {
            throw new Error("faild to add new post")
        }
        const newPost = await res.json()
        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl) 
        showPost()
    } catch (error) {
        console.log("failed to add new post:", error)
    }
}

button.addEventListener('click', showPost);
form.addEventListener('submit', addPost);