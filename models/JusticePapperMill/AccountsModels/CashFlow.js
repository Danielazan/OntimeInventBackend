const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JCashFlow extends Model{}


 JCashFlow.init({
    CustomerName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      DepositedBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Debit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Credit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Balance: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeCashFlow' // Set the model name
    });






module.exports = {JCashFlow};
