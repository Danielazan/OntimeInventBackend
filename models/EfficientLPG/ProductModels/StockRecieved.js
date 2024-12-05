const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EProductRecieved extends Model{}


 EProductRecieved.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QtyRecived: {
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
      Company: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientProductsRecieved' // Set the model name
    });






module.exports = {EProductRecieved};
