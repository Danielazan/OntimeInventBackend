const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Sales extends Model{}


 Sales.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UnitPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Customer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNumbr: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Credit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OldBalance: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      NoItems: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AmountPaid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CustomerBank: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TransactionMode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TransactionAccount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Remark: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Sales' // Set the model name
    });






module.exports = {Sales};
