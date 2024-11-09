const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JSupplierReport extends Model{}


 JSupplierReport.init({
      SupplierName: {
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
      }
      
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeSupplierReport' // Set the model name
    });






module.exports = {JSupplierReport};
