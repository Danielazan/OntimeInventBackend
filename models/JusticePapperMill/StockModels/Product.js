const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JProduct extends Model{}


 JProduct.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TotalQuantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CostPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      SellingPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      InvoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      DatePurchased: {
        type: DataTypes.DATE,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JProducts' // Set the model name
    });

    class JStockLedger extends Model {}

    JStockLedger.init({
          Date: {
            type: DataTypes.DATE,
            allowNull: false
          },
          InvoiceNo: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Particulars: {
            type: DataTypes.STRING,
            allowNull: false
          },
          QtyIn: {
            type: DataTypes.STRING,
            allowNull: false
          },
          QtyOut: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Balance: {
            type: DataTypes.STRING,
            allowNull: false
          },
          StockName: {
            type: DataTypes.INTEGER, // Change to STRING to match ProductName's type
            references: {
                model: JProduct,
                key: 'id' // Reference the correct field here
            }
        }
    }, {
        sequelize,
        modelName: 'JStockLedger'
    });

 // Establish relationships
 JProduct.hasMany(JStockLedger, { foreignKey: 'StockName'});
 JStockLedger.belongsTo(JProduct, { foreignKey: 'StockName'});


module.exports = {JProduct,JStockLedger};
