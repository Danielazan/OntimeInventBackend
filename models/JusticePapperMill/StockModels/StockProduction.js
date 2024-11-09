const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  StockProduction extends Model{}


 StockProduction.init({
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Location: {
    type: DataTypes.STRING,
    allowNull: false
  },
 

  Shift: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Quantity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NoRolls: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  BatchNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Line:{
    type: DataTypes.STRING,
    allowNull: false
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
      
     
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'StockProduction' // Set the model name
    });






module.exports = {StockProduction};
