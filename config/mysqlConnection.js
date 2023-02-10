const mysql = require("mysql");
const connectionMysql = mysql.createConnection({
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  user: 'root',
  port:3306,
});
console.log(connectionMysql.state);
module.exports = connectionMysql;
