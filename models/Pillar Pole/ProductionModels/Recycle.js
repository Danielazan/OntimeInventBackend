const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Recycle extends Model{}


 Recycle.init({
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Machine: {
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
      Quantity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      NoItems: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Waste: {
        type: DataTypes.STRING,
        allowNull: false
      },
      BatchNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Type:{
        type: DataTypes.STRING,
        allowNull: false
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'Recycles' // Set the model name
    });






module.exports = {Recycle};
