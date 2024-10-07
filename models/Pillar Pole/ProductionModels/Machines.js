const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Machine extends Model{}


 Machine.init({
      MachineName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Machines' // Set the model name
    });






module.exports = {Machine};
