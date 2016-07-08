var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'spayses19891990';

module.exports.encrypt = encryptPassword;
module.exports.decrypt = decrypt; 

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function encryptPassword(plainText) {
    return crypto.createHash('md5').update(plainText).digest('hex');
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
