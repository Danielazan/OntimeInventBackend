const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  Category extends Model{}


 Category.init({
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
      modelName: 'Categorys' // Set the model name
    });






module.exports = {Category};
