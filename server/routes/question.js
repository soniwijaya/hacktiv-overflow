const express = require('express')
const router = express.Router()

const {
    authentication,
} = require('../middlewares/auth')

const {
    addQuestion,
    showQuestions,
    findQuestion,
    editQuestion,
    deleteQuestion,
    upVote,
    downVote
} = require('../controllers/question.controller')


router.post('/add', authentication, addQuestion)
router.get('/', showQuestions)
router.get('/:id', findQuestion)
router.put('/:id', authentication, editQuestion)
router.delete('/:id', authentication, deleteQuestion)
router.put('/:id/up-vote', authentication, upVote)
router.put('/:id/down-vote', authentication, downVote)

module.exports = router

