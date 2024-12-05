const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JRefund extends Model{}


 JRefund.init({
      CustomerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OldBalance: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AmoundRefunded: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      PaymentMode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TransactionAccount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ReceiptNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeRefunds' // Set the model name
    });






module.exports = {JRefund};
