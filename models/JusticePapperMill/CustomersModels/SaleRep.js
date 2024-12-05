const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  JSalesRep extends Model{}


 JSalesRep.init({
      SalesRepName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'JusticeSalesReps' // Set the model name
    });






module.exports = {JSalesRep};
