const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JusticeNewSupplier extends Model{}


 JusticeNewSupplier.init({
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
      modelName: 'JusticeNewSuppliers' // Set the model name
    });






module.exports = {JusticeNewSupplier};
