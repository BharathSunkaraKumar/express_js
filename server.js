import express from 'express';
import path from 'path';
import posts from './routes/posts.js'
import errorHandling from './middlewares/error.js';
const app = express();
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//static setup folder
// app.use(express.static(path.join(__dirname, "public")))

//routes

app.use('/api/posts', posts)

app.use(errorHandling)


app.listen(port,()=> console.log(`server is running on port ${port}`) )