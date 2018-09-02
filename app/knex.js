var config = require('../config/config'); 

var dbconfig    = require('../knexfile'); 
var Knex        = require('knex')(dbconfig[config.env]);

module.exports = Knex;

Knex.migrate.rollback([dbconfig]);
//Knex.migrate.latest([dbconfig]); 
//Knex.seed.run([dbconfig]);