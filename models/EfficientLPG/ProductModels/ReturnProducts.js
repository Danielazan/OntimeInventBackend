const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EReturnProduct extends Model{}


 EReturnProduct.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QuantityReturned: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Unitprice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Customer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      CashRefunded: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: false
      }
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientReturnProducts' // Set the model name
    });






module.exports = {EReturnProduct};
