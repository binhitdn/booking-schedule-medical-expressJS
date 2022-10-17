'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    static associate(models) {
      schedules.belongsTo(models.allcodes, {
        foreignKey: 'timeType',
        targetKey: 'keyMap',
        as: 'timeTypeData'
      })
    }
  };
  schedules.init({
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'schedules',
  });
  return schedules;
};