
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

var mysql = require('mysql');

var databaseUrl = "mongodb://localhost:27000";

var connection = mysql.createConnection({
    host     : 'my04.winhost.com',
    user     : 'bigcall112',
    password : 'tigers112',
    database : 'mysql_90970_spayses'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/SignUp', routes.SignUp);
app.get('/ForgotPassword', routes.ForgotPassword);
app.get('/ForgotPassword', routes.ForgotPassword);
app.get('/Home', routes.home);

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

app.post('/AddUser', function (req, res) {
    
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var varifypassword = req.body.varifypassword;
    
    if (assert.equal(password, varifypassword)) {
        var test1 = 1;
    } else {
        var test2 = 1;
    }
    
    mongo.connect(databaseUrl, function (err, db) {
        assert.equal(null, err);
        
        var userDB = db.collection('users');
        
        if (ValidateUserData(userDB, username, password)) {
            insertUser(userDB, username, password, "TEST DATE", email, function () {
                db.close();
                
                res.end();
            });
        }
        
        res.end();
    })
})

var ValidateUserData = function(db, username, email) {

    if (!CheckIfUsernameExists(db, username) && !CheckIfEmailExists(db, email)) {
        return true;
    }

    return false;
}


var CheckIfUsernameExists = function(db, username) {
    
    var found = db.find({
        "username": username,
    });

    return true;
}

function CheckIfEmailExists(db, email) {
    
    var found = db.find({
        "email": email,
    });

    return true;
}

var insertUser = function (db, username, password, registerDate, email, callback) {
    
    var hasUserDB = db.collection('users');
    
    db.insert({
        "username": username,
        "password": password,
        "registerdate": registerdate,
        "email": email,
    }, function (err, result) {
        assert.equal(err, null);
        callback();
    });
}

