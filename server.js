import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import posts from './routes/posts.js'
import errorHandling from './middlewares/error.js';
const app = express();
const port = process.env.PORT || 8000

const __firename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__firename)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//static setup folder
app.use(express.static(path.join(__dirname, "public")))

//routes

app.use('/api/posts', posts)

app.use((req, res, next) =>{
    const error = new Error('Not Found')
    error.status = 404;
    next(error)
})

app.use(errorHandling)


app.listen(port,()=> console.log(`server is running on port ${port}`) )