const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JStockUsed extends Model{}


 JStockUsed.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PurchasePrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QuantityUsed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UsedFor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      IssueNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
     
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JStokUsed' // Set the model name
    });






module.exports = {JStockUsed};
