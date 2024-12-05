const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  ESupplierReport extends Model{}


 ESupplierReport.init({
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
      modelName: 'EfficientSupplierReport' // Set the model name
    });






module.exports = {ESupplierReport};
