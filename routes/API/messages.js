const firebase = require('firebase');
const admin = require('firebase-admin');

const db = firebase.database();

exports.get = function(req, res) {
    "use strict";
    let token = req.query.token;
    admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            db.ref('messages').child(uid).orderByKey().once('value', (snapshot)=>{
                let data = snapshot.val();
                res.json({ protocol: 200, messages: data });
            });
        })
        .catch(function(error) {
            // TODO LOG
            if (error) console.log('error:', error);
            res.json({ protocol: 401, error: error.toString() });
        });
};

exports.post = function(req, res) {
    "use strict";
    let token = req.body.token;
    admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            let message = {};
            message[+new Date()] = req.body.message;
            db.ref('messages').child(uid).update(message)
                .then(function() {
                    res.json({ protocol: 201 });
                })
                .catch(function(error) {
                    // TODO LOG
                    if (error) console.log('error:', error);
                    res.json({ protocol: 500, error: error });
                });
        })
        .catch(function(error) {
            // TODO LOG
            if (error) console.log('error:', error);
            res.json({ protocol: 401, error: error });
        });
};

exports.delete = function(req, res) {
    "use strict";
    let token = req.body.token;
    admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            let timestamp = req.body.timestamp;
            db.ref('messages').child(uid).child(timestamp).remove()
                .then(function() {
                    res.json({ protocol: 200 });
                })
                .catch(function(error) {
                    // TODO LOG
                    if (error) console.log('error:', error);
                    res.json({ protocol: 500, error: error });
                });
        })
        .catch(function(error) {
            // TODO LOG
            if (error) console.log('error:', error);
            res.json({ protocol: 401, error: error });
        });
};