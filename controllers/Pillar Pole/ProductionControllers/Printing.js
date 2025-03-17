const {
    Printing
  } = require("../../../models/Pillar Pole/ProductionModels/Printing");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await Printing.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreatePrinting = async (req, res) => {
    const {
        ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      NameOperator,
      Shift,
      Type,
      Machine,
      MaterialsUsed,
      PrintingMachineUsed,
      BatchNo,
      Key,
      Date,
    } = req.body;
  
    try {
      const pro = await Printing.create({
          ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      NameOperator,
      Shift,
      Type,
      Machine,
      MaterialsUsed,
      PrintingMachineUsed,
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
  
  const GetAllPrintings = async (req, res) => {
    try {
      const Cat = await Printing.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };
  
  const GetSinglePrinting = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await Printing.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdatePrinting = async (req, res) => {
    const Productid = req.params.id;
  
    const {
          ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      NameOperator,
      Shift,
      Type,
      Machine,
      MaterialsUsed,
      PrintingMachineUsed,
      BatchNo,
      Key,
      Date,
    } = req.body;
  
    try {
      // Update the database with the new image path
      Printing.update(
        {
              ProductName,
      NoRolls,
      Location,
      Customer,
      Quantity,
      Waste,
      NameOperator,
      Shift,
      Type,
      Machine,
      MaterialsUsed,
      PrintingMachineUsed,
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
  
  const DeletePrinting = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Printing.destroy({
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
      CreatePrinting,
      GetAllPrintings,
      GetSinglePrinting,
      UpdatePrinting,
      DeletePrinting,
  };
  