const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EfficientNewSupplier extends Model{}


 EfficientNewSupplier.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },

      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientNewSuppliers' // Set the model name
    });






module.exports = {EfficientNewSupplier};
