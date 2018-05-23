require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const index = require('./routes/index')
const user = require('./routes/users')
const question = require('./routes/question')
const answer = require('./routes/answer')

mongoose.connect(`mongodb://${process.env.DATABASE}:${process.env.PW}@ds133550.mlab.com:33550/overflow`)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('now server connected')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', index)
app.use('/users', user)
app.use('/questions', question)
app.use('/answers', answer)

module.exports = app