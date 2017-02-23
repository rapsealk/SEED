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
const serviceAccount = require('./SEED-d6e717e515c6.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://seed-3a079.firebaseio.com'
});

const alarm = require('./routes/alarm');
const messages = require('./routes/messages');
const weather = require('./routes/weather');
//const settings = require('./routes/settings');

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

//let token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ0OTQ5MTAwMzM1YTJlOWI5NzNkYTBmMGEwOTZhNDlkODAzNmE5MDkifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2VlZC0zYTA3OSIsIm5hbWUiOiJVU0VSLXM5MjAzMSIsInBpY3R1cmUiOiJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL3NlZWQtM2EwNzkuYXBwc3BvdC5jb20vby9mYXZpY29uLWZpcmViYXNlLnBuZz9hbHQ9bWVkaWEmdG9rZW49ZDQ1NzJhZWEtMTkwMS00M2I4LWExNTAtNTA4OTg0MTAyZmM0IiwiYXVkIjoic2VlZC0zYTA3OSIsImF1dGhfdGltZSI6MTQ4NzgxOTI0NCwidXNlcl9pZCI6InN6RzlVRkNIbzVNVUpQZ3Z5dUd0UTB2dVNWbzIiLCJzdWIiOiJzekc5VUZDSG81TVVKUGd2eXVHdFEwdnVTVm8yIiwiaWF0IjoxNDg3ODE5MjQ2LCJleHAiOjE0ODc4MjI4NDYsImVtYWlsIjoidGVzdEBzZWVkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHNlZWQuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.XsYxy5E6bU46c0gi0Dd0HV_hCN7VKgFTA9mrkonOy365SHaNGhOy9iLOreHkTMOjfCSKL_uIfdVMY5yRhi1WrGuTWF7Rmc3JfOaWhW5pp6jRaOjX0tHF43_jg5vHOUIkumCxjO_ztCGEiOiBJ7bayvdVmndy2BiaVHNX2c5Sc-bcs49QPRCjWBlFCtqjAKawuLe5n18iMsq78DguH6wOtfZ-V4szSFDydp7UIf_uADFmwt6JQLWHp77PwFLQgEt0Rwc8gA0kXO1XYaYQvHgN8alD5RZ4Ddw6t2H8xsVMq66-3m3TjUa0CDFGKiv-XKmt-eoUChXKfyVH6FhF6vgTCQ';

app.post('/token', function(req, res) {
    "use strict";
    let email = req.body.email;
    let password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userRecord) {
            userRecord.getToken(true)
                .then(function(idToken) {
                    res.json({ protocol: 0, token: idToken });
                })
                .catch(function(error) {
                    res.json({ protocol: 0, error: error });
                });
        })
        .catch(function(error) {
            res.json({ protocol: 0, error: error });
        });
});
app.use('/alarm', alarm);
app.use('/messages', messages);
app.use('/weather', weather);
//app.use('/settings', settings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
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
