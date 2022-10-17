'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allcodes extends Model {
    static associate(models) {
      allcodes.hasMany(models.users, {
        foreignKey: 'positionId',
        as: 'positionData'
      })
      allcodes.hasMany(models.users, {
        foreignKey: 'gender',
        as: 'genderData'
      })
      allcodes.hasMany(models.schedules, {
        foreignKey: 'timeType',
        as: 'timeTypeData'
      });
      allcodes.hasMany(models.doctors, {
        foreignKey: 'priceId',
        as: 'priceTypeData'
      })
      allcodes.hasMany(models.doctors, {
        foreignKey: 'provinceId',
        as: 'provinceTypeData'
      })
      allcodes.hasMany(models.doctors, {
        foreignKey: 'paymentId',
        as: 'paymentTypeData'
      })



    }
  };
  allcodes.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'allcodes',
  });
  return allcodes;
};