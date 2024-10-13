const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  AccountType extends Model{}


 AccountType.init({
      AccountTypeName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'AccountTypes' // Set the model name
    });






module.exports = {AccountType};
