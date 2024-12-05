const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JWaybill extends Model{}


 JWaybill.init({
      DriversName: {
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
      WayBillNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      CustomerName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      WayBillItems: {
        type: DataTypes.STRING,
        allowNull: false
      },
      RecivedBY: {
        type: DataTypes.STRING,
        allowNull: false
      },
      LorryNo: {
        type: DataTypes.STRING,
        allowNull: false
      },

      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
     
   
      
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JWaybills' // Set the model name
    });






module.exports = {JWaybill};
