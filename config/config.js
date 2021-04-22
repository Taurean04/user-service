const dotenv = require('dotenv').config();

module.exports=
{
  "development": {
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    secret: process.env.SECRET,
    appPort: process.env.APP_PORT
  },
"production": {
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    secret: process.env.SECRET,
    appPort: process.env.APP_PORT
  }
}