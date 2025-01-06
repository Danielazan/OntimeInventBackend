const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JStockReturn extends Model{}


JStockReturn .init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QtyRecived: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Unitprice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PurchasePrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Customer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ItemsNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeStockReturn' // Set the model name
    });






module.exports = {JStockReturn};
