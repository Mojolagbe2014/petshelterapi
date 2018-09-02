var config = require('../config/config'); 

var dbconfig    = require('../knexfile'); 
var Knex        = require('knex')(dbconfig[config.env]);

module.exports = Knex;

switch (config.dboperation) {
    case 'rollback':    Knex.migrate.rollback([dbconfig]);
                        break;
    case 'migrate':     Knex.migrate.latest([dbconfig]); // create database table
                        break;
    case 'seed':        Knex.seed.run([dbconfig]);  // seed the database table
                        break;
    default:            // do nothing
                        break;
}
