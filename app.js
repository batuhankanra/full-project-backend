const express =require('express')
const postRoute = require('./routes/post.route')
const authRoute = require('./routes/auth.route')
const cookieParser = require('cookie-parser')


const app=express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/posts",postRoute)
app.use("/api/auth",authRoute)

app.listen(8000,()=>{
    console.log("server is running")
})