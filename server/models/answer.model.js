const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  answer:{type: String, minlength:1, required: true},
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
},{
  timestamps: true
})

let answer = mongoose.model('answer', answerSchema)

module.exports = answer