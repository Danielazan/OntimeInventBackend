const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Operator extends Model{}


 Operator.init({
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Operators' // Set the model name
    });






module.exports = {Operator};
