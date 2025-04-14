const {Model, DataTypes } = require("sequelize")
const {ECompanyLocation} = require("./Pump")

const sequelize = require("../../../database")

class  EProduct extends Model{}


 EProduct.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Retalprice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ReOrderLevel: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientProducts' // Set the model name
    });


class EProductLocation extends Model {}

    EProductLocation.init(
      {
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        QtyRem: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        QtySold: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        AmountInCash: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        TransferRecieved: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        TransferGiven: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "EProductLocation",
      }
    );


class EStockLedger extends Model {}

    EStockLedger.init(
      {
        Date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        InvoiceNo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Particulars: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        QtyIn: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        QtyOut: {
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
        modelName: "EStockLedger",
      }
    );





// Establish relationships
EProduct.belongsToMany(ECompanyLocation, {
  hooks: true,
  through: EProductLocation,
});
ECompanyLocation.belongsToMany(EProduct, { through: EProductLocation});

ECompanyLocation.hasMany(EStockLedger);
EStockLedger.belongsTo(ECompanyLocation);

EProduct.hasMany(EStockLedger, {  hooks: true });
EStockLedger.belongsTo(EProduct);

module.exports = { EProduct, EStockLedger, EProductLocation };
