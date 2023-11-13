const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const mysql2 = require('mysql2');
const sequelize = require('./config/database');
const { PORT } = require('./config/config');

const theatre = sequelize.define('theatre', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const screen = sequelize.define('screen', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const movie = sequelize.define('movie', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const screening = sequelize.define('screening', {
	showTime: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

const app = express();
app.use(express.json());

app.listen(PORT, () => {
	sequelize.sync();
	console.log('Server is running on port '+PORT);
});


// To Do