
//#region Require Variables

var db = require('../lib/db');
var crypto = require('../lib/Crypto')
var emailer = require('../lib/Email')

//#endregion

//#region Public Variables

//#endregion

//#region Initialise Mongoose Options

db.connect();
var UserSchema = new db.Schema({
    username : { type: String, unique: true, required: true }, 
    password : { type: String, required: true },
    email: { type: String, unique: true, required: true },
    verificationToken: { type: Number, unique: true, required: false },
    chats: { type: Array },
    facebookId: { type: Number, unique: true, required: false },
    twitterId: { type: Number, unique: true, required: false },
    googleId: { type: Number, unique: true, required: false },
});

var AppUserSchema = new db.Schema({
    username : { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    AppId: { type: Number, unique: true, required: false },
});

var User = db.mongoose.model('User', UserSchema);
var FacebookUser = db.mongoose.model('FacebookUser', AppUserSchema);
var TwitterUser = db.mongoose.model('TwitterUser', AppUserSchema);
var GoogleUser = db.mongoose.model('GoogleUser', AppUserSchema);

UserSchema.pre('save', true, function (next, done) {
    var self = this;
    db.mongoose.models["User"].findOne({ username: self.username }, function (err, user) {
        if (err) {
            done(err);
        } else if (user) {
            self.invalidate("username", "username must be unique");
            done(new Error("username must be unique"));
        } else {
            done();
        }
    });
    
    db.mongoose.models["User"].findOne({ email: self.email }, function (err, user) {
        if (err) {
            done(err);
        } else if (user) {
            self.invalidate("username", "email must be unique");
            done(new Error("username must be unique"));
        } else {
            done();
        }
    });
    next();
});

//#endregion

//#region Expose Public Methods 

module.exports.addUser = addUser;
module.exports.CheckIfUsernameExists = CheckIfUsernameExists;
module.exports.CheckIfEmailExists = CheckIfEmailExists;
module.exports.CheckIfUserExists = CheckIfUserExists; 
module.exports.RemoveVerificationToken = RemoveVerificationToken; 
module.exports.GetUser = GetUser; 

//#endregion

//#region Methods

// Add user to database 
function addUser(username, password, email, callback) {
    var rand = Math.floor((Math.random() * 100) + 54);
    
    var instance = new User();
    instance.username = username;
    instance.password = crypto.encrypt(password);
    instance.email = email;
    instance.VerificationToken = rand;
    
    emailer.SendVerificationEmail(username, rand, email, function (err) {
        if (!err) {
            instance.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, instance);
                }
            });
        } else {
            callback(err);
        }
    })
}

// Add user to database 
function addFacebookUser(name, email, facebookId, callback) {
    var instance = new User();
    instance.username = name;
    instance.password = facebookId;
    instance.FacebookEmail = email;
    instance.FacebookId = facebookId;
    instance.email = email;
    
    instance.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, instance);
        }
    });
}

//Check if username exists
function CheckIfUsernameExists(userName, callback) {
    User.findOne({ username: userName }, function (err, user) {
        if (err) {
            callback(err, true);
        } else if (user) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    });
}

//Remove verification id
function RemoveVerificationToken(token, callback) {
    User.findOne({ verificationToken: token }, function (err, user) {
        if (err) {
            callback(err, true);
        } else if (user) {
            var query = { verificationToken: token };
            User.update(query, { verificationToken: '' }, {}, function (err, numAffected) {
                if (err)
                    callback(err, false);
                else if (numAffected.nModified > 0)
                    callback(null, true);
                else
                    callback(null, false);
            });
        } else {
            callback(null, false);
        }
    });
}

//Check if email exists
function CheckIfEmailExists(eMail, callback) {
    User.findOne({ email: eMail }, function (err, user) {
        if (err) {
            callback(err, true);
        } else if (user) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    });
}

//Check if user exists
function CheckIfUserExists(req, sEmail, sPassword, callback) {
    User.findOne({ email: sEmail, password: crypto.encrypt(sPassword) }, 'username verificationToken id', function (err, user) {
        if (err) {
            callback(err, false, false);
        } else if (user) {
            if (user.verificationToken == '') {
                req.session._id = id;
                callback(null, true, true);
            }                
            else
                callback("", true, false);
        } else {
            callback(null, false, false);
        }
    });
}

function GetUser(_id, callback) {
    User.findOne({ _id: _id }, '_id username verificationToken email', function (err, user) {
        if (err)
            callback(err, user);
        else
            callback(null, user);
    });
}

//#endregion


