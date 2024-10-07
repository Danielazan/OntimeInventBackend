const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Supplier extends Model{}


 Supplier.init({
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
      Credit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Debit: {
        type: DataTypes.STRING,
        allowNull: false
      }

      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Suppliers' // Set the model name
    });






module.exports = {Supplier};
