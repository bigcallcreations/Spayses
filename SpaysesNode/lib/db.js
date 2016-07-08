//New Mongo DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
module.exports.connect = connect;

var dbUrl = "mongodb://daniel:tigers112@ds011495.mlab.com:11495/spayses";

//connect();

// Connect to mongo 
function connect() {
    mongoose.connect(dbUrl);
}

function disconnect() {
    mongoose.disconnect()
}