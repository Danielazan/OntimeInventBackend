const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Printing extends Model{}


 Printing.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Category: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      NoRolls: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // NoItems:{
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      Location:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Customer:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Waste: {
        type: DataTypes.STRING,
        allowNull: false
      },
      NameOperator: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Shift: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Type:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Machine: {
        type: DataTypes.STRING,
        allowNull: false
      },
      MaterialsUsed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      PrintingMachineUsed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // QtyName: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      BatchNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Key: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // NoRollUsed: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Printings' // Set the model name
    });






module.exports = {Printing};
