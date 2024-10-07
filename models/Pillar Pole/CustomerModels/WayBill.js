const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  WayBill extends Model{}


 WayBill.init({
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Customer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Lpo:{
        type: DataTypes.STRING,
        allowNull: false
      },
      PreparedBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      DriverName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      RecievedBy: {
        type: DataTypes.STRING,
        allowNull: false
      },
      LorryNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'WayBills' // Set the model name
    });






module.exports = {WayBill};
