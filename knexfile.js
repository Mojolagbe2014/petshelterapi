var config = require(__dirname+'/config/config');

module.exports = {

    development: {
        migrations: { tableName: config.migrations },
        seeds: { tableName: config.seeds },

        client: config.client,
        connection: {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            charset: config.charset
        }

    },
    production: {
        migrations: { tableName: config.migrations },
        seeds: { tableName: config.seeds },

        client: config.client,
        connection: {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            charset: config.charset
        }

    },
    production2: {
        "use_env_variable": "DATABASE_URL"
    }
};