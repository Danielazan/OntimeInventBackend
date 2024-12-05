const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ECusDeposit extends Model{}


 ECusDeposit.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UnitPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CustomerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      AmountDeposited: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ReceiptNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientCustomerDeposit' // Set the model name
    });






module.exports = {ECusDeposit};
