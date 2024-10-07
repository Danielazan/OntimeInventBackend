const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Refund extends Model{}


 Refund.init({
      CustomerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UnitPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      TransactionMode: {
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
      InvoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Refunds' // Set the model name
    });






module.exports = {Refund};
