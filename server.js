const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')


//intialized apps
const app = express()
const mongoose = require('./config/db')
const port = process.env.PORT ? process.env.PORT : 3000
const morgan = require('morgan')

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())


//routers
const UserRouter = require('./routes/UserRouter')
const CommentRouter = require('./routes/CommentRouter')
const BlogRouter = require('./routes/BlogRouter')

//use routes
app.use('/comments', CommentRouter),
app.use('/blogs', BlogRouter),
app.use('/auth', UserRouter)

//
app.get('/', (req, res) => {
  res.send('Your App is Connected...')
})

//listener
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})