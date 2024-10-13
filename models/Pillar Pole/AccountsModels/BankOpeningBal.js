const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  BankOpeningBalance extends Model{}


 BankOpeningBalance.init({
      BankAccount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OpeningBalance: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'BankOpeningBalances' // Set the model name
    });






module.exports = {BankOpeningBalance};
