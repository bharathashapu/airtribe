const { DataTypes, sequelize } = require("sequelize");

module.exports = (sequelize) => {
    const Movie = sequelize.define('Movie', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      languages: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      genre: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      certificate: {
        type: DataTypes.STRING(5),
        allowNull: true
      }
    }, {
      tableName: 'movie',
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_0900_ai_ci'
    });
  
    return Movie;
  };