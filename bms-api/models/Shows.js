const { DataTypes, sequelize } = require('sequelize');

module.exports = (sequelize) => {
	const Show = sequelize.define('Show', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false
		},
		totalSeats: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		format: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		language: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		dimension: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		hallNumber: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		theatreID: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: 'theatre',
				key: 'id'
			}
		},
		movieID: {
			type: DataTypes.BIGINT,
			allowNull: true,
			references: {
				model: 'movie',
				key: 'id'
			}
		}
	}, {
		tableName: 'shows',
		timestamps: true,
		charset: 'utf8mb4',
		collate: 'utf8mb4_0900_ai_ci'
	});

	return Show;
};