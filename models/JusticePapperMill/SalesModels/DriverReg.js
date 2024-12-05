const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JDriverReg extends Model{}


 JDriverReg.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      VechileNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Capacity: {
        type: DataTypes.STRING,
        allowNull: false
      },

      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JDriverRegs' // Set the model name
    });






module.exports = {JDriverReg};
