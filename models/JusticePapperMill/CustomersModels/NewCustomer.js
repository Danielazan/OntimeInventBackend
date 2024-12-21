const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JCustomer extends Model{}


 JCustomer.init({
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
        type: DataTypes.STRING,
        allowNull: false
      },
      OpeningBalDebit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentCashPaid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentAmountOwedCustomer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentQtySupplied: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentQtyOwedCustomer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      AccountBalance: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentStockowed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentQtyPaidFor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentProductAmountSupplied: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentNumberStockReturned: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeCustomers' // Set the model name
    });


    class JCustomerLedger extends Model {}

    JCustomerLedger.init({
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
          AmountPaid: {
            type: DataTypes.STRING,
            allowNull: false
          },
          QuantitySupplied: {
            type: DataTypes.STRING,
            allowNull: false
          },
          BalanceInCash: {
            type: DataTypes.STRING,
            allowNull: false
          },
          BalanceInKg: {
            type: DataTypes.STRING,
            allowNull: false
          },
          UnitPrice: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Cr: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Dr: {
            type: DataTypes.STRING,
            allowNull: false
          },
        CustomerName: {
            type: DataTypes.INTEGER,
            references: {
                model: JCustomer,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'JCustomerLedger'
    });
    
    // Establish relationships
    JCustomer.hasMany(JCustomerLedger, { foreignKey: 'CustomerName' });
    JCustomerLedger.belongsTo(JCustomer, { foreignKey: 'CustomerName' });
    



module.exports = {JCustomer,JCustomerLedger};
