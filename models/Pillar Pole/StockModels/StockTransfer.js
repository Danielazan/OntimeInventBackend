const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  StockTransfer extends Model{}


 StockTransfer.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PurchasePrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      From: {
        type: DataTypes.STRING,
        allowNull: false
      },
      To: {
        type: DataTypes.STRING,
        allowNull: false
      },
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'StockTransfers' // Set the model name
    });






module.exports = {StockTransfer};
