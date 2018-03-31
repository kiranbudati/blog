const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    url: 'mongodb://kirancse:kirancse@ds125479.mlab.com:25479/mad',
    secret:  crypto,
};