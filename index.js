/*
    TODO: 
        -show genres of books on home page
*/

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const dbconnect = require('./middleware/dbconnect');
const auth = require('./middleware/auth');
const get_username = require('./middleware/get_user');
const get_checkedbooks = require('./middleware/get_checkedbooks');
const ignore_favicon = require('./middleware/ignore_favicon');
const session = require('express-session');
//const { options } = require('./routes/router');

//init express app
const app = express();

//init templating
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

//init session
app.use(session({secret: "SDJdjaksSAD"}));

//init body-parser
app.use(express.json());
app.use(express.urlencoded());

//init middleware
app.use(ignore_favicon);
app.use(logger);
app.use(auth);
app.use('/user/', get_username);
app.use('/user/', get_checkedbooks);
//display data

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//set routing module
app.use('/', require('./routes/router.js'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('Server started on port %s', PORT));