const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JAcHeads extends Model{}


 JAcHeads.init({
      AcHeadsName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeAcHeadss' // Set the model name
    });






module.exports = {JAcHeads};
