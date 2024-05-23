const {body} = require('express-validator');
const User = require('../models/User');

module.exports = [
    body('name', 'Name should be at least 3 characters.').isLength({min: 3, max: 20}).isAlphanumeric(),
    body('email', 'Please use a valid email address.').isEmail().normalizeEmail().custom(async (value, {req}) => {
        try {
            const user = await User.findOne({email: value});

            if(user){
                return Promise.reject('This email is used by another user!');
            }
        } catch (error) {
            console.log(error);
        }
    }),
    body('password', 'Password should be at least 6 characters.').isLength({min: 6, max: 20}).isAlphanumeric().custom((value, {req}) => {
        if(value !== req.body.repeatPassword){
            return Promise.reject('Passwords must be the same.');
        }
        return true;
    })
]