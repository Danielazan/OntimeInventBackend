const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../../database");

class EPump extends Model {}

EPump.init(
  {
    PumpName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    TotalSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: "EfficientPumps", // Set the model name
  }
);

class ECompanyLocation extends Model {}

ECompanyLocation.init(
  {
    LocationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ECompanyLocation",
  }
);

class PumpLocation extends Model {}

PumpLocation.init(
  {
    CurrentclosingReading: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    CurrentOpeningReading: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    LastPumpAttendant: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    TotalSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    TotalRevenue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    LastSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "PumpLocation",
  }
);

// Establish relationships
EPump.belongsToMany(ECompanyLocation, {
  hooks: true,
  through: PumpLocation,
});
ECompanyLocation.belongsToMany(EPump, {
  through: PumpLocation
});

module.exports = { EPump, ECompanyLocation, PumpLocation };
