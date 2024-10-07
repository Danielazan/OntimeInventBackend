const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  PostBill extends Model{}


 PostBill.init({
      ExpenseAccountName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UnitCost: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Company: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PostBills' // Set the model name
    });






module.exports = {PostBill};
