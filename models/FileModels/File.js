const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database");

class FileUpdate extends Model {}

FileUpdate.init({
  Version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
  sequelize,
  modelName: "FileUpdate",
  tableName: "FileUpdates",
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = { FileUpdate };
