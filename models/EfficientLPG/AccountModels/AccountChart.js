const {Model, DataTypes } = require("sequelize")
const {ECompanyLocation} = require("../ProductModels/Pump")
const sequelize = require("../../../database")

class  EAccountChart extends Model{}


 EAccountChart.init({
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
      modelName: 'EfficientAccountCharts' // Set the model name
    });

class  EAccountType extends Model{}

EAccountType.init({
        AccountTypeName: {
        type: DataTypes.STRING,
        allowNull: false
        },
    
    }, {
        sequelize, // Pass the sequelize instance
        modelName: 'EfficientAccountTypes' // Set the model name
    });

class  EAcHeads extends Model{}


EAcHeads.init({
        AcHeadsName: {
        type: DataTypes.STRING,
        allowNull: false
        },
    
    }, {
        sequelize, // Pass the sequelize instance
        modelName: 'EfficientAcHeads' // Set the model name
    });

class EAccountLocation extends Model {}

EAccountLocation.init(
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
    modelName: "EfficientAccountLocation",
  }
);
class EAccounntLedger extends Model {}

EAccounntLedger.init(
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
    modelName: "EfficientAccounntLedger",
  }
);

// Establish relationships
EAccountChart.belongsToMany(ECompanyLocation, {
  onDelete: "CASCADE",
  hooks: true,
  through: EAccountLocation,
});
ECompanyLocation.belongsToMany(EAccountChart, { through: EAccountLocation });

ECompanyLocation.hasMany(EAccounntLedger);
EAccounntLedger.belongsTo(ECompanyLocation);

EAccountChart.hasMany(EAccounntLedger, { onDelete: "CASCADE", hooks: true });
EAccounntLedger.belongsTo(EAccountChart);




module.exports = {EAccountChart,EAccounntLedger,EAccountLocation,EAccountType,EAcHeads};
