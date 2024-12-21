const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  PaymentVocher extends Model{}


 PaymentVocher.init({
      ExpenseAccountName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SalesSupplierRep: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      PayingAccount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PV: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AmountPaid: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PaymentVochers' // Set the model name
    });






module.exports = {PaymentVocher};
