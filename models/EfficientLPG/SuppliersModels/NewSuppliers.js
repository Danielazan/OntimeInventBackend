const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EfficientNewSupplier extends Model{}


 EfficientNewSupplier.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TimesSupplied: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastStockSupplied: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TotalQtySupplied: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastQtySupplied: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CurrentCredit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CurrentDebit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CurrentBalance: {
        type: DataTypes.STRING,
        allowNull: false,
      } 
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientNewSuppliers' // Set the model name
    });


    class ESupplierLedger extends Model {}

    ESupplierLedger.init(
      {
        Date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        InvoiceNo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Quantity: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Balance: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        UnitPrice: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Credit: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Debit: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        SupplierName: {
          type: DataTypes.INTEGER,
          references: {
            model: EfficientNewSupplier,
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "ESupplierLedger",
      }
    );

// Establish relationships
EfficientNewSupplier.hasMany(ESupplierLedger, { foreignKey: "SupplierName", onDelete: "CASCADE", });
ESupplierLedger.belongsTo(EfficientNewSupplier, { foreignKey: "SupplierName",onDelete: "CASCADE", });

module.exports = { EfficientNewSupplier,ESupplierLedger };

