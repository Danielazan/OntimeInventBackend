const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JExpenseAccount extends Model{}


 JExpenseAccount.init({
      AccountName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AccountNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeExpenseAccounts' // Set the model name
    });






module.exports = {JExpenseAccount};
