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

    class JProductCat extends Model {}

    JProductCat.init({
          Name: {
            type:  DataTypes.STRING,
            allowNull: false
          },
          
          ProCategory: {
            type: DataTypes.INTEGER, // Change to STRING to match ProductName's type
            references: {
                model: JCategory,
                key: 'id' // Reference the correct field here
            }
        }
    }, {
        sequelize,
        modelName: 'JProductCat'
    });

 // Establish relationships
 JCategory.hasMany(JProductCat, { foreignKey: 'ProCategory'});
 JProductCat.belongsTo(JCategory, { foreignKey: 'ProCategory'});







module.exports = {JCategory,JProductCat};
