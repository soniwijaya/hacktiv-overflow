const express = require('express')
const router = express.Router()

const {
  authentication,
} = require('../middlewares/auth')

const {
  addAnswer,
  findAnswer,
  upVote,
  downVote,
} = require('../controllers/answer.controller')

router.post('/:questionId/add',authentication, addAnswer)
router.get('/:id', findAnswer)
router.put('/:id/up-vote', authentication, upVote)
router.put('/:id/down-vote', authentication, downVote)

module.exports = router
