const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")
const {CompanyLocation} = require("./Product")

class  PillarOpenCloseBal extends Model{}


 PillarOpenCloseBal.init({
    Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      OpeningQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      QtyIn: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      TotalStock: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      QtyOut: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ClosingQty: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      
      LocationId: {
        type: DataTypes.INTEGER,
        references: {
          model: CompanyLocation, // or CompanyLocation depending on what Sequelize auto-generates
          key: 'id'
        }
      }
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'PillarOpenCloseBal' // Set the model name
    });



 // Establish relationships
CompanyLocation.hasMany(PillarOpenCloseBal, { foreignKey: 'LocationId' });
PillarOpenCloseBal.belongsTo(CompanyLocation, { foreignKey: 'LocationId' });


module.exports = {PillarOpenCloseBal};
