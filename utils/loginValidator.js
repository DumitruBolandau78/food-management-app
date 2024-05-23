const {body} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = [
    body('email', 'Please use a valid email address.').isEmail().normalizeEmail().custom( async (value, {req}) => {
        try {
            const user = await User.findOne({email: value});

            if(!user){
                return Promise.reject('Please use a valid email address. Account doesnt exist.');
            }
        } catch (error) {
            console.log(error);
        }
    }),
    body('password', 'Password should be at least 6 characters.').isLength({min: 6, max: 20}).isAlphanumeric().custom( async (value, {req}) => {
        try {
            const user = await User.findOne({email: req.body.email});

            if(user){
                const equalPasswords = await bcrypt.compare(value, user.password);

                if(!equalPasswords){
                    return Promise.reject('Incorrect password.');
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }),
]