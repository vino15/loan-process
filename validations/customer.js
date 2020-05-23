const { check } = require('express-validator')
const { regex } = require('../helpers')

module.exports = {
    signUpValidator: [
        check('firstName', 'first name is required').not().isEmpty(),
        check('lastName', 'last name is required').not().isEmpty(),
        check('mobileNumber', 'mobile number is required').not().isEmpty()
	        .isMobilePhone()
	        .withMessage('Enter valid mobileNumber'),
        check('email','Email is required').not().isEmpty()
            .isEmail()
            .withMessage('Enter the valid email'),
        check('password','Password is required').not().isEmpty()
            .isLength({ min: 6 })
            .withMessage('Password must contain at least 6 characters')
            .matches(regex.password)
            .withMessage('Password must contain one character & one special character!!')
    ]
}