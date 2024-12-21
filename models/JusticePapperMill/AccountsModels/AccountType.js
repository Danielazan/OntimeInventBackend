const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JAccountType extends Model{}


 JAccountType.init({
      AccountTypeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeAccountTypes' // Set the model name
    });






module.exports = {JAccountType};
