
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class doctor extends Model {
        static associate(models) {
            doctor.belongsTo(models.users, {
                foreignKey: 'doctorId'
            });
            doctor.belongsTo(models.allcodes, {
                foreignKey: 'priceId',
                targetKey: 'keyMap',
                as: 'priceTypeData'
            });
            doctor.belongsTo(models.allcodes, {
                foreignKey: 'provinceId',
                targetKey: 'keyMap',
                as: 'provinceTypeData'
            });
            doctor.belongsTo(models.allcodes, {
                foreignKey: 'paymentId',
                targetKey: 'keyMap',
                as: 'paymentTypeData'
            });


        }
    };
    doctor.init({
        doctorId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'doctors',
    });
    return doctor;
};