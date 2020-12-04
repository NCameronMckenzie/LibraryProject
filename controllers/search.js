const db = require('../middleware/dbconnect');


exports.searchinstance_submit = function(req, res, next) {

    //TODO: rewrite this to be more concise
    if (req.query.filter == 'ISBN'){
        var search_term = "%" + req.query.q + "%";
        var sql = "SELECT * FROM books WHERE ISBN LIKE ?";
    }else if (req.query.filter == 'Author'){
        var search_term = "%" + req.query.q + "%";
        var sql = "SELECT * FROM books WHERE author LIKE ?";
    }else if (req.query.filter == 'Genre'){
        var search_term = "%" + req.query.q + "%";
        var sql = "SELECT * FROM books WHERE genre LIKE ?";
    }else{ //DEFAULT CASE
        var search_term = "%" + req.query.q + "%";
        var sql = "SELECT * FROM books WHERE title LIKE ?";
    }


    //"SELECT * FROM 'books' WHERE 'title' LIKE CONCAT(?, '%')"
    db.query(sql, search_term, function (err, data, fields) {
        if(err){
            console.log(err.sqlMessage);
            res.redirect('/books/');
        }else{
            console.log(req.query.q + ' returned ' + data.length + " results");
            res.render('bookobj', {layout: 'search', results: data, val: req.query.q});
        }
    });
};