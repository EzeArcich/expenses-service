const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_expenses', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
