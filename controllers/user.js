const db = require('../middleware/dbconnect');

exports.getinstance_user = function (req, res, next) {
    var usernname = res.locals.user;
    var checkedbooks = res.locals.checkedbooks;

    //res.render('books', {layout: 'search', username: , checked_info: });
    res.render('user', {layout: 'account', username: usernname, checkedbooks: checkedbooks});
};

exports.postinstance_availability = function (req, res, next) {
    var ISBN = req.body.btn_available;

    console.log(ISBN);
    //get ISBN
    //change availability

    res.redirect(`/user/?id=${req.session.user}`);    
};

exports.postinstance_login = function (req, res, next) { //not safe for production, dev use only
    var user = req.body.user;
    var pass = req.body.pass;
    var sql = "SELECT username, pass, aid FROM administrators WHERE username = ? AND pass = ?";
    
    db.query(sql, [user, pass], function (err, data, fields) {
        if (err) {
            console.log(err.sqlMessage);
        }else{
            //create session
            req.session.user = data[0].aid;
            res.redirect(`/user/?id=${req.session.user}`); //redirect to user admin page
        }
    });
};