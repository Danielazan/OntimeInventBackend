const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JCategory extends Model{}


 JCategory.init({
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Location: {
        type: DataTypes.STRING,
        allowNull: true
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JCategorys' // Set the model name
    });






module.exports = {JCategory};
