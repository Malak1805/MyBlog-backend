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


//
app.get('/', (req, res) => {
  res.send('Your App is Connected...')
})