const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ExpenseAccount extends Model{}


 ExpenseAccount.init({
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
      modelName: 'ExpenseAccounts' // Set the model name
    });






module.exports = {ExpenseAccount};
