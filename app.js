const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const firebase = require('firebase');
const config = {
    apiKey: "AIzaSyC54g3ZFHO0aq7jFUiaq6e0O0tzR4g3d5U",
    authDomain: "seed-3a079.firebaseapp.com",
    databaseURL: "https://seed-3a079.firebaseio.com",
    storageBucket: "seed-3a079.appspot.com",
    messagingSenderId: "204598217154"
};
firebase.initializeApp(config);

const admin = require('firebase-admin');
var serviceAccount = require('./SEED-d6e717e515c6.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://seed-3a079.firebaseio.com'
});

const index = require('./routes/index');
const update = require('./routes/update');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const info = require('./routes/info');
const gallery = require('./routes/gallery');
const message = require('./routes/message');
const request = require('./routes/request');
const problem = require('./routes/problem');

const app = express();

app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon-firebase.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/update', update);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/info', info);
app.use('/gallery', gallery);
app.use('/info/message', message);
app.use('/request', request);
app.use('/problem', problem);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
