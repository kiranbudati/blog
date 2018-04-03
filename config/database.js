const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    // url: 'mongodb://kirancse:kirancse@ds125479.mlab.com:25479/mad',
    url:'mongodb://127.0.0.1:27017/blog',
    secret:  crypto,
};