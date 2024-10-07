const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Product extends Model{}


 Product.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TotalQuantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SellingPrice: {
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
      DatePurchased: {
        type: DataTypes.DATE,
        allowNull: false
      },
      QtyIn: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QtyOut: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Balance: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Products' // Set the model name
    });






module.exports = {Product};
