const {
  NewProduction,
} = require("../../../models/Pillar Pole/ProductionModels/NewProduction");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await NewProduction.drop();
      console.log("Table deleted successfully.");
  } catch (error) {
      console.error("Error deleting table:", error);
  }
}

const CreateNewProduction = async (req, res) => {
  const {
    ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      CoreWeight,
      NameOperator,
      Shift,
      MaterialsUsed,
      Type,
      Machine,
      BatchNo,
      Key,
      Date,
  } = req.body;

  try {
    const pro = await NewProduction.create({
      ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      CoreWeight,
      NameOperator,
      Shift,
      MaterialsUsed,
      Type,
      Machine,
      BatchNo,
      Key,
      Date,

    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllNewProductions = async (req, res) => {
  try {
    const Cat = await NewProduction.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};

const GetSingleNewProduction = async (req, res) => {
  const ProductId = req.params.id;

  try {
    const Getone = await NewProduction.findOne({ where: { id: ProductId } }).then(
      (result) => {
        res.status(200).json({ result });
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateNewProduction = async (req, res) => {
  const Productid = req.params.id;

  const {
    ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      CoreWeight,
      NameOperator,
      Shift,
      MaterialsUsed,
      Type,
      Machine,
      BatchNo,
      Key,
      Date,
  } = req.body;

  try {
    // Update the database with the new image path
    NewProduction.update(
      {
        ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      CoreWeight,
      NameOperator,
      Shift,
      MaterialsUsed,
      Type,
      Machine,
      BatchNo,
      Key,
      Date,
      },
      { where: { id: Productid } }
    )
      .then(() => {
        res.status(200).json({ message: "Record updated successfully" });
      })
      .catch((dbError) => {
        res.status(500).json({ error: dbError.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteNewProduction = async (req, res) => {
  try {
    const { id } = req.params;

    const Cat = await NewProduction.destroy({
      where: { id },
      cascade: true,
    }).then((result) => {
      res.status(200).json({ message: "Record deleted successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    CreateNewProduction,
    GetAllNewProductions,
    GetSingleNewProduction,
    UpdateNewProduction,
    DeleteNewProduction,
};
