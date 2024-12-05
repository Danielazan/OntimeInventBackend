const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EPump extends Model{}


 EPump.init({
      PumpName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientPumps' // Set the model name
    });






module.exports = {EPump};
