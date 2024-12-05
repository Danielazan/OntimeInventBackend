const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ReciptVocher extends Model{}


 ReciptVocher.init({
      ProductName: {
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
      AmountPaid: {
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
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'ReciptVocher' // Set the model name
    });






module.exports = {ReciptVocher};
