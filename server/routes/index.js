const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.send('Welcome server ON Now')
})

module.exports = router
