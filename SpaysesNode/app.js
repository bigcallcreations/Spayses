
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var app = express();
var databaseUrl = "mongodb://localhost:27000";
var fs = require('fs');
var User = require('./models/Users.js');
//var db = require('./lib/db.js');
var Crypto = require('./lib/Crypto.js');
var bodyParser = require('body-parser');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({ secret: 'secretpasswordforsessions' }));


app.get('/', routes.index);
app.get('/SignUp', routes.SignUp);
app.get('/ForgotPassword', routes.ForgotPassword);
app.get('/Chat', routes.contact);
app.get('/Home', routes.home);
app.get('/api/user/:username', routes.CheckUsername);
app.get('/api/email/:email', routes.CheckEmail);
app.get('/Verify/:id', routes.Verify);

//for chat
var serve = http.createServer(app);
var io = require('socket.io')(serve);

serve.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (socket) {
    io.emit('userConnected', "A User Connected.");
    
    socket.on('chat', function (msg) {
        io.emit('chat', msg);
    });
});

//#region User

app.post('/SignIn', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.CheckIfUserExists(req, email, password, function (err, exists, verfied) {
        if (err) res.end(err.toString());
        else if (exists) {
            
            if (verfied) {
                //User Exists... Sign user in, assign cookies.
                //res.redirect('/Home');
                res.end();
            }
            else {
                io.emit('test', "TEST");
                //socket.emit('chat', { message: $('#m').val(), user: m_name });
                //res.end();
                
            }
        } else {
            //User does not exist. display message
            //res.redirect('/');
            res.end();
        }
    });
})

app.post('/AddUser', function (req, res) {
    
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var varifypassword = req.body.varifypassword;
    
    if (password != varifypassword) res.end("Passwords need to be the same.");
    
    User.addUser(username, password, email, req, function (err, user) {
        if (err) res.end(err.toString());
        else res.redirect('/Home');
    });
})

//#endregion