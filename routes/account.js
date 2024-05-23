const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const signupValidator = require('../utils/signupValidator');
const loginValidator = require('../utils/loginValidator');

router.get('/login', (req, res) => {
    if(!req.session.isAuth){
        res.render('account', {
            title: "Management Login",
            isLogin: true,
            error: req.flash('error'),
            csrf: req.csrfToken()
        });
    } else {
        return res.redirect('/management');
    }
});

router.get('/signup', (req, res) => {
    if(!req.session.isAuth){
        res.render('account', {
            title: "Management Signup",
            isSignup: true,
            error: req.flash('error'),
            csrf: req.csrfToken()
        });
    } else {
        return res.redirect('/management');
    }
});

router.post('/signup', signupValidator, async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            req.flash('error', errors.array()[0].msg);
            return res.redirect('/account/signup');
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashPassword });

        user.save();
        return res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', loginValidator, async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            req.flash('error', errors.array()[0].msg);
            return res.redirect('/account/login');
        }

        req.session.user = user;
        req.session.isAuth = true;
        req.session.save(err => {
            if(err) throw new err;
            return res.redirect('/management');
        });

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
        return res.redirect('/account/login');
    });
});

module.exports = router;