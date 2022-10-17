'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_tokens extends Model {
    static associate(models) {
    
        user_tokens.belongsTo(models.users, {
            foreignKey: 'doctorId',
            targetKey: 'id',
            as: 'doctorToken'
        })
      }
    
  };
  user_tokens.init({
    token: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_tokens'
  });
  return user_tokens;
};