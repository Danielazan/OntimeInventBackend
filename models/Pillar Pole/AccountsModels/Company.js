const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Company extends Model{}


 Company.init({
      CompanyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Companys' // Set the model name
    });






module.exports = {Company};
