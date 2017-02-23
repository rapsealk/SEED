const firebase = require('firebase');
const admin = require('firebase-admin');

const db = firebase.database();

exports.get = function(req, res) {
    "use strict";
    let token = req.query.token;
    admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            db.ref('messages').child(uid).once('value', (snapshot)=>{
                let data = snapshot.val();
                res.json({ protocol: 0, messages: data });
            }, function(errorObject) {
                // TODO LOG
                res.json({ protocol: 0, error: errorObject });
            });
        })
        .catch(function(error) {
            // TODO LOG
            res.json({ protocol: 0, error: error });
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
                    res.json({ protocol: 0 });
                })
                .catch(function(error) {
                    // TODO LOG
                    res.json({ protocol: 0, error: error });
                });
        })
        .catch(function(error) {
            // TODO LOG
            res.json({ protocol: 0, error: error });
        });
};