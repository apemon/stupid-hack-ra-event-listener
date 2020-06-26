const mysql = require("mysql");

// config
const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const conn = mysql.createConnection(config);

module.exports = conn;
