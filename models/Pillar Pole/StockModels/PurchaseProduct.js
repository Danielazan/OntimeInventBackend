const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  PurchaseProduct extends Model{}


 PurchaseProduct.init({
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
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PurchaseProducts' // Set the model name
    });






module.exports = {PurchaseProduct};
