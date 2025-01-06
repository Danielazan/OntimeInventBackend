const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JAccountChart extends Model{}


 JAccountChart.init({
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
      TotalAmountRemaing: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TotalAmountOut: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TotalAmountIn: {
        type: DataTypes.STRING,
        allowNull: false
      },
      BalanceSheet: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeAccountCharts' // Set the model name
    });


    class JAccountLeger extends Model {}

    JAccountLeger.init({
          Date: {
            type: DataTypes.DATE,
            allowNull: false
          },
          InvoiceNo: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          AmountOut: {
            type: DataTypes.STRING,
            allowNull: false
          },
          AmountIn: {
            type: DataTypes.STRING,
            allowNull: false
          },
          
          PaidTo: {
            type: DataTypes.STRING,
            allowNull: false
          },
        AccountName: {
            type: DataTypes.INTEGER,
            references: {
                model: JAccountChart,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'JAccountLeger'
    });
    
    // Establish relationships
    JAccountChart.hasMany(JAccountLeger, { foreignKey: 'AccountName' });
    JAccountLeger.belongsTo(JAccountChart, { foreignKey: 'AccountName' });






module.exports = {JAccountChart,JAccountLeger};
