const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  AccountChart extends Model{}


 AccountChart.init({
      AccountType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AcHead: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profitLoss: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AccountName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      BalanceSheet: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'AccountCharts' // Set the model name
    });






module.exports = {AccountChart};
