const { DataTypes, sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Theatre = sequelize.define('Theatre', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      totalHalls: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
  }, {
    tableName: 'theatre',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });

  return Theatre;
};