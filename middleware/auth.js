module.exports = function authMiddleware(req, res, next){
    if(!req.session.isAuth){
        return res.redirect('/account/login');
    }

    next();
}