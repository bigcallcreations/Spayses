
/*
 * GET home page.
 */

//#region Sign In Pages

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

exports.SignUp = function (req, res) {
    res.render('SignUp', { title: 'SignIn', year: new Date().getFullYear(), message: 'Your application description page' });
};

exports.ForgotPassword = function (req, res) {
    res.render('ForgotPassword', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

exports.home = function (req, res) {
    res.render('Home', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};

//#endregion

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page' });
};