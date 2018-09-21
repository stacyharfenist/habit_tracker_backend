const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/date', require('./date'))
router.use('/task', require('./task'))
router.use('/status', require('./status'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
