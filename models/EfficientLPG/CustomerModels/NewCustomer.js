const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ECustomer extends Model{}


 ECustomer.init({
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
      CreditLimit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OpeningBalCredit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OpeningBalDebit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientCustomers' // Set the model name
    });






module.exports = {ECustomer};
