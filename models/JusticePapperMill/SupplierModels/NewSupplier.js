const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JusticeNewSupplier extends Model{}


 JusticeNewSupplier.init({
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
      CurrentCredit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentDebit: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CurrentBalance: {
        type: DataTypes.STRING,
        allowNull: false
      },

      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeNewSuppliers' // Set the model name
    });



    class JSupplierLedger extends Model {}

    JSupplierLedger.init({
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
          Quantity: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Balance: {
            type: DataTypes.STRING,
            allowNull: false
          },
          UnitPrice: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Credit: {
            type: DataTypes.STRING,
            allowNull: false
          },
          Debit: {
            type: DataTypes.STRING,
            allowNull: false
          },
        SupplierName: {
            type: DataTypes.INTEGER,
            references: {
                model: JusticeNewSupplier,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'JSupplierLedger'
    });
    
    // Establish relationships
    JusticeNewSupplier.hasMany(JSupplierLedger, { foreignKey: 'SupplierName' });
    JSupplierLedger.belongsTo(JusticeNewSupplier, { foreignKey: 'SupplierName' });



module.exports = {JusticeNewSupplier,JSupplierLedger};
