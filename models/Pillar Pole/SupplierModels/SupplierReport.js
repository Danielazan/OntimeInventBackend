const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  PSupplierReport extends Model{}


 PSupplierReport.init({
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
      modelName: 'PillarPoleSupplierReport' // Set the model name
    });






module.exports = {PSupplierReport};
