
/*
 * GET home page.
 */

//#region Sign In Pages
var User = require('../models/Users.js');
var Emailer = require('../lib/Email.js');

exports.index = function (req, res) {
    //Do check based on cookies to see if they have logged in lately
    if (req.session && req.session._id) {
        res.render('Home', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    }

    res.render('index', { title: 'Express', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.SignUp = function (req, res) {
    res.render('SignUp', { title: 'SignIn', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.ForgotPassword = function (req, res) {
    res.render('ForgotPassword', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.home = function (req, res) {
    if (req.session._id) {
        res.render('Home', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    }
    
    res.redirect('/');
};

exports.Verify = function (req, res) {
    res.render('Verify', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    //User.RemoveVerificationToken(req.params.id, function (err, success) {
        
    //    if (err) res.render('Verify', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });

    //    if (success) {
    //        res.render('Home', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    //    } else {
    //        res.render('Verify', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
    //    }
    //});
};

exports.ResendVerify = function (req, res) {
    
};

//#endregion

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.CheckUsername = function (req, res) {
    User.CheckIfUsernameExists(req.params.username, function (err, exists) {
        if (exists) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
};

exports.CheckEmail = function (req, res) {
    User.CheckIfEmailExists(req.params.email, function (err, exists) {
        if (exists) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
};
