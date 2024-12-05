const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EProduct extends Model{}


 EProduct.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Retalprice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ReOrderLevel: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientProducts' // Set the model name
    });






module.exports = {EProduct};
