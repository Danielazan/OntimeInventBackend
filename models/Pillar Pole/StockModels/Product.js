const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../database");

class Product extends Model {}

Product.init(
  {
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TotalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CostPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SellingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TotalQtySold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TotalAmountQtySold: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TotalQtyProduced: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    InvoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DatePurchased: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

class CompanyLocation extends Model {}

CompanyLocation.init(
  {
    LocationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CompanyLocation",
  }
);

class ProductLocation extends Model {}

ProductLocation.init(
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
    modelName: "ProductLocation",
  }
);

class PStockLedger extends Model {}

PStockLedger.init(
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
    modelName: "PStockLedger",
  }
);

// Establish relationships
Product.belongsToMany(CompanyLocation, {
  onDelete: "CASCADE",
  hooks: true,
  through: ProductLocation,
});
CompanyLocation.belongsToMany(Product, { through: ProductLocation });

CompanyLocation.hasMany(PStockLedger);
PStockLedger.belongsTo(CompanyLocation);

Product.hasMany(PStockLedger, { onDelete: "CASCADE", hooks: true });
PStockLedger.belongsTo(Product);

module.exports = { Product, PStockLedger, CompanyLocation, ProductLocation };
