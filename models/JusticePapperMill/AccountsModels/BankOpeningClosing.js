const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JBankOpeningBalance extends Model{}


 JBankOpeningBalance.init({
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
      modelName: 'JusticeBankOpeningBalances' // Set the model name
    });






module.exports = {JBankOpeningBalance};
