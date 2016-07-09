
//#region Require Variables

var nodemailer = require('nodemailer');
var os = require('os');

//#endregion

//#region Public Variables

var smtpTransport = nodemailer.createTransport('smtps://dwormald12@gmail.com:tigers112@smtp.gmail.com')
var mailOptions, host, link;

//#endregion

//#region Expose Public Methods 

module.exports.SendVerificationEmail = SendVerificationEmail;
module.exports.SendEmail = SendEmail;

//#endregion

//#region Methods

function SendVerificationEmail(username, verifyId, emailTo, callback) {
    //host = req.get('host');
    host = 'localhost:1337';
    link = "http://" + host + "/Verify/" + verifyId;
    mailOptions = {
        from: 'dwormald12@gmail.com',
        to : 'dwormald12@gmail.com',
        subject : "Please confirm your Email account",
        html : "Hello " + username + ",<br><br> Please Click on the link to verify your email.<br><br><a href=" + link + ">Click here to verify</a>"
    }
    
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            console.log("Message sent: " + response.message);
            callback(null);
        }
    });
}

function SendEmail(to, from, subject, body, callback) {
    mailOptions = {
        from: from,
        to : to,
        subject : subject,
        html : body
    }
    
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            console.log("Message sent: " + response.message);
            callback(null);
        }
    });
}

//#endregion