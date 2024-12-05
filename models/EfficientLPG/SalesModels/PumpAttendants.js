const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EPumpAttendants extends Model{}


 EPumpAttendants.init({
      PumpAttendantName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientPumpAttendants' // Set the model name
    });






module.exports = {EPumpAttendants};
