'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
   
    static associate(models) {
      
    }
  };
  bookings.init({
    statusID: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timeType:  DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};