
const auth = function (req, res, next) {
    if (req.session.user || req.originalUrl == '/login'){
        next();
    }else{
        console.log('else triggered inside auth');
        res.redirect('/login');
    }
};

module.exports = auth;