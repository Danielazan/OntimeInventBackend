const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JusticesCompany extends Model{}


JusticesCompany.init({
      CompanyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticesCompanys' // Set the model name
    });






module.exports = {JusticesCompany};
