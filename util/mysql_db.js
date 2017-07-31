var config = require('../config')
var mysql = require('mysql');

var pool = mysql.createPool(config.mysqlDataLink[config.currentEnviroment]);

function query(sql , params, callback) {
    pool.getConnection(function (err, connection) {
        var q  = connection.query(sql, params, function (err, data) {
            callback(err, data);
            connection.release();
        });
    });
}
exports.query = query;