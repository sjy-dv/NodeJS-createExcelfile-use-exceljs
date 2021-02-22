const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    'rootdb',
    'root',
    'rootpw',
    {
        host : '127.0.0.1',
        dialect : 'mysql',
        operatorsAliases : 0
    }
);

let db = [];

db.member = require('./member.js')(sequelize, DataTypes);

db.sequelize = sequelize;

module.exports = db;