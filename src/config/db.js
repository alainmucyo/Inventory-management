require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // password:'chemistryis1',
    // database:'test',
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: process.env.DB_TYPE,
    // port:5000
    
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: process.env.DB_TYPE,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: process.env.DB_TYPE,
  },
};
