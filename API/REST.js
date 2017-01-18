const firebase = require('firebase');
const admin = require('firebase-admin');

// CREATE
exports.createUser = function(req, res) {
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        displayName: req.body.email.split('@')[0],
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/seed-3a079.appspot.com/o/favicon-firebase.png?alt=media&token=d4572aea-1901-43b8-a150-508984102fc4',
        disabled: false
    })
        .then(function(userRecord) {
            firebase.auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(function() {
                    res.redirect(307, '../..');
                })
                .catch(function(error) {
                    //if (error) console.log(error);
                    res.render('problem', { error: error });
                });
        })
        .catch(function(error) {
            //if (error) console.log(error);
            res.render('problem', { error: error });
        });
};

// READ
exports.getUserByEmail = function(req, res) {

    admin.auth().getUserByEmail(email)
        .then(function(userRecord) {
            // See the tables above for the contents of userRecord
            console.log("Successfully fetched user data:", userRecord.toJSON());
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
        });

};
exports.getUserByUid = function(req, res) {

    admin.auth().getUser(req.body.uid)
        .then(function(userRecord) {
            // See the tables below for the contents of userRecord
            console.log("Successfully fetched user data:", userRecord.toJSON());
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
        });

};

// UPDATE
exports.updateUser = function(req, res) {

    admin.auth().updateUser(uid, {
        email: "modifiedUser@example.com",
        emailVerified: true,
        password: "newPassword",
        displayName: "Jane Doe",
        photoURL: "http://www.example.com/12345678/photo.png",
        disabled: true
    })
        .then(function(userRecord) {
            console.log("Successfully updated user", userRecord.toJSON());
        })
        .catch(function(error) {
            console.log("Error updating user:", error);
        });

};

// DELETE
exports.deleteUser = function(req, res) {

    var user = firebase.auth().currentUser;
    var uid = user.uid;

    firebase.auth().signOut()
        .then(function() {
            admin.auth().deleteUser(uid)
                .then(function() {
                    res.redirect('../../');
                })
                .catch(function(error) {
                    res.render('problem', { error: error });
                });
        }, function(error) {
            // an error occured.
            res.render('problem', { error: error });
        });
};