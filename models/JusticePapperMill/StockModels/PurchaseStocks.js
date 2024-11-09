const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  PurchaseStocks extends Model{}


 PurchaseStocks.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QuantityBought: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SellingPrice: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      DatePurchased: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Company: {
        type: DataTypes.STRING,
        allowNull: false
      },
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PurchaseStocks' // Set the model name
    });






module.exports = {PurchaseStocks};
