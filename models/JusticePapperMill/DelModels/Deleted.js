const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  DeletedItems extends Model{}


 DeletedItems.init({
      Type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Data:{
        type: DataTypes.STRING,
        allowNull: false
      },
      DeletedBy:{
        type: DataTypes.STRING,
        allowNull: false
      },

      
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeDeletedItems' // Set the model name
    });






module.exports = {DeletedItems};
