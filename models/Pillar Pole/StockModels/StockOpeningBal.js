const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  StockOpeningBal extends Model{}


 StockOpeningBal.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: true
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TransNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PillarStockOpeningBal' // Set the model name
    });






module.exports = {StockOpeningBal};
