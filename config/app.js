const dotenv = require('dotenv').config();
const environmentVariables ={
    development: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: 'stargazer',
        port: process.env.DB_PORT,
        dialect: process.env.DIALECT,
        secret: process.env.SECRET,
        appPort: process.env.APP_PORT
    },
    production: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT,
        dialect: process.env.DIALECT,
        secret: process.env.SECRET,
        appPort: process.env.APP_PORT
    }
};
console.log(environmentVariables[process.env.NODE_ENV])
module.exports = environmentVariables[process.env.NODE_ENV];