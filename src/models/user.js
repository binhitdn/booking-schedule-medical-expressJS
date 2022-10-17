'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.allcodes, {
        foreignKey: 'positionId',
        targetKey: 'keyMap',
        as: 'positionData'
      })
      users.belongsTo(models.allcodes, {
        foreignKey: 'gender',
        targetKey: 'keyMap',
        as: 'genderData'
      })
      users.hasOne(models.doctors, {
        foreignKey: 'doctorId',
      })
      users.hasMany(models.doctors_clinics_specialties, {
        foreignKey: 'doctorId',
      })
      users.hasMany(models.user_tokens, {
        foreignKey: 'doctorId',
      })
    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,

    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phone: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'users'
  });
  return users;
};