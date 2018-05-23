const router = require('express').Router()

const {
  registerUser,
  loginManual,
  loginUser
} = require('../controllers/user.controller')

router.post('/', registerUser)
router.post('/login', loginManual)
router.post('/login/fb', loginUser)

module.exports = router
