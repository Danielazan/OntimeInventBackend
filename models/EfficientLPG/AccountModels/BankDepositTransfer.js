const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EBankDepositTransfer extends Model{}


 EBankDepositTransfer.init({
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PaidTo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Amount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      TellerNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PayingAccount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientBankDepositTransfers' // Set the model name
    });






module.exports = {EBankDepositTransfer};
