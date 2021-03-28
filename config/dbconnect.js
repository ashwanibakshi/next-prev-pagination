const mysql = require('mysql');

const connect = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'blog' 
});

module.exports = connect;