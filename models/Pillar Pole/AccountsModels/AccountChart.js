const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")
const {CompanyLocation} = require("../StockModels/Product")

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

    class AccountLocation extends Model {}

AccountLocation.init(
  {
    TotalAmountIn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    TotalAmountOut: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    AmoutRem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    LastCreditAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    LastDebitAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    
  },
  {
    sequelize,
    modelName: "PillarPoleAccountLocation",
  }
);
class AccounntLedger extends Model {}

AccounntLedger.init(
  {
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    InvoiceNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Particulars: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AmountIn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AmountOut: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PillarPoleAccounntLedger",
  }
);

// Establish relationships
AccountChart.belongsToMany(CompanyLocation, {
  onDelete: "CASCADE",
  hooks: true,
  through: AccountLocation,
});
CompanyLocation.belongsToMany(AccountChart, { through: AccountLocation });

CompanyLocation.hasMany(AccounntLedger);
AccounntLedger.belongsTo(CompanyLocation);

AccountChart.hasMany(AccounntLedger, { onDelete: "CASCADE", hooks: true });
AccounntLedger.belongsTo(AccountChart);




module.exports = {AccountChart,AccounntLedger,AccountLocation};
