const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ProductTransfer extends Model{}


 ProductTransfer.init({
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
      modelName: 'EfficientProductTransfers' // Set the model name
    });






module.exports = {ProductTransfer};
