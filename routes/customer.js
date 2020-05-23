const router = require('express').Router()
const { signUpValidator } = require('../validations/customer')
const { signUp } = require('../controllers/customer')
const { handleFieldError } = require('../middleware')

router.post('/signup',signUpValidator,handleFieldError,signUp)

module.exports = router
