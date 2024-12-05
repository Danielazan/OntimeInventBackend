const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ESalesEntry extends Model{}


 ESalesEntry.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UnitPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PumpNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PumpAttendant: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OpeningReading: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ClosingReading: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QuantitySold: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Total: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Testing: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Variation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Deeping: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CashPaid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Pos: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Transfer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Remark: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientSalesEntry' // Set the model name
    });






module.exports = {ESalesEntry};
