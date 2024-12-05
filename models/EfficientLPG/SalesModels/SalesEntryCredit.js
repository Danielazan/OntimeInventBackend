const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ESalesEntryCredit extends Model{}


 ESalesEntryCredit.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PumpNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UnitPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SoldTo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      QunatiySold: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PumpAttendant: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNo: {
        type: DataTypes.STRING,
        allowNull: false
      },

      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientSalesEntryCredits' // Set the model name
    });






module.exports = {ESalesEntryCredit};
