const {Model, DataTypes } = require("sequelize")

const sequelize = require("../../../database")

class  EPumpAttendants extends Model{}


 EPumpAttendants.init({
      PumpAttendantName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TimesSold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      NumberQtySold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      LastDateSold: {
        type: DataTypes.DATE,
        allowNull: false
      },
      LastQtySold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'EfficientPumpAttendants' // Set the model name
    });


    class EAttendanntsLedger extends Model {}

    EAttendanntsLedger.init(
      {
        Date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        InvoiceNo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        QuantitySold: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        UnitPrice: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        AmountAccepted: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        AttendantName: {
          type: DataTypes.INTEGER,
          references: {
            model: EPumpAttendants,
            key: "id",
          },
        },
      },
      {
        sequelize,
        modelName: "EAttendanntsLedger",
      }
    );


    // Establish relationships
EPumpAttendants.hasMany(EAttendanntsLedger, { foreignKey: "AttendantName", onDelete: "CASCADE", });
EAttendanntsLedger.belongsTo(EPumpAttendants, { foreignKey: "AttendantName",onDelete: "CASCADE", });

module.exports = { EPumpAttendants,EAttendanntsLedger };
