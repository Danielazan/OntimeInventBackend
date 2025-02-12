const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../../database");

class Supplier extends Model {}

Supplier.init(
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: "Suppliers", // Set the model name
  }
);

class PSupplierLedger extends Model {}

PSupplierLedger.init(
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
        model: Supplier,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "PSupplierLedger",
  }
);

// Establish relationships
Supplier.hasMany(PSupplierLedger, { foreignKey: "SupplierName" });
PSupplierLedger.belongsTo(Supplier, { foreignKey: "SupplierName" });

module.exports = { Supplier,PSupplierLedger };
