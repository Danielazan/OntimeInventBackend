const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  PillarStockUsed extends Model{}


PillarStockUsed.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Roll: {
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
      OperatorName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Machine: {
        type: DataTypes.STRING,
        allowNull: false
      },
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PillarStockUsed' // Set the model name
    });






module.exports = {PillarStockUsed};
