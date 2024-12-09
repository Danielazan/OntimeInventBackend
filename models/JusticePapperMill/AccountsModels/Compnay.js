const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JCompany extends Model{}


 JCompany.init({
      CompanyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeCompanys' // Set the model name
    });






module.exports = {JCompany};
