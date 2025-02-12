const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../../database");

class Category extends Model {}

Category.init(
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: "Categorys", // Set the model name
  }
);

class PProductCat extends Model {}

PProductCat.init(
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ProCategory: {
      type: DataTypes.INTEGER, // Change to STRING to match ProductName's type
      references: {
        model: Category,
        key: "id", // Reference the correct field here
      },
    },
  },
  {
    sequelize,
    modelName: "PProductCat",
  }
);

// Establish relationships
Category.hasMany(PProductCat, { foreignKey: "ProCategory" });
PProductCat.belongsTo(Category, { foreignKey: "ProCategory" });

module.exports = { Category,PProductCat};
