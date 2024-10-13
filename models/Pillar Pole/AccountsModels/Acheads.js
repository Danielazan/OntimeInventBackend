const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  AcHeads extends Model{}


 AcHeads.init({
      AcHeadsName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'AcHeadss' // Set the model name
    });






module.exports = {AcHeads};
