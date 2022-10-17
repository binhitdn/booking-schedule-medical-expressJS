'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialties extends Model {
  
    static associate(models) {
        specialties.hasMany(models.doctors_clinics_specialties,{
          foreignKey: 'specialtyId'
        })
    }
  };
  specialties.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    image: DataTypes.BLOB
    
    
    
    
  }, {
    sequelize,
    modelName: 'specialties',
  });
  return specialties;
};