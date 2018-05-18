const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname+'/../config/setup')[env];

module.exports = config;