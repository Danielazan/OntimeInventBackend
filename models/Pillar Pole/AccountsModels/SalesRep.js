const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  SalesRep extends Model{}


 SalesRep.init({
      SalesRepName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'SalesReps' // Set the model name
    });






module.exports = {SalesRep};
