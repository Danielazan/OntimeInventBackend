const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ECustomer extends Model{}


 ECustomer.init({
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
      CreditLimit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      OpeningBalCredit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      OpeningBalDebit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentCashPaid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      TotalCashPaid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      TotalQtyBought: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentAmountOwedCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentQtySupplied: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentQtyOwedCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      AccountBalance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentStockowed: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentQtyPaidFor: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CurrentProductSupplied: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentNumberStockReturned: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientCustomers' // Set the model name
    });


    class ECustomerLedger extends Model {}

    ECustomerLedger.init({
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
        QuantityPaid: {
          type: DataTypes.INTEGER,
            allowNull: false
          },
          AmountPaid: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          QuantitySupplied: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          BalanceInCash: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          BalanceInKg: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          UnitPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          Cr: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          Dr: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          Location: {
            type: DataTypes.STRING,
            allowNull: false
          },
        CustomerName: {
            type: DataTypes.INTEGER,
            references: {
                model: ECustomer,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'EfficientCustomerLedger'
    });
    
    // Establish relationships
    ECustomer.hasMany(ECustomerLedger, { foreignKey: 'CustomerName' });
    ECustomerLedger.belongsTo(ECustomer, { foreignKey: 'CustomerName' });
    



module.exports = {ECustomer,ECustomerLedger};
