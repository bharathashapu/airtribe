const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = require('./config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	dialect: 'mysql',
	host: DB_HOST,
	port: Number(DB_PORT),
	dialectModule: mysql2
});

module.exports = sequelize;