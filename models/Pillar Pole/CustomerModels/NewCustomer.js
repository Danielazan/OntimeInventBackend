const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Customer extends Model{}


 Customer.init({
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
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Customers' // Set the model name
    });






module.exports = {Customer};
