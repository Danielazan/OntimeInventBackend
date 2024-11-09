const {
    StockProduction
  } = require("../../../models/JusticePapperMill/StockModels/StockProduction");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await StockProduction.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateStockproduction = async (req, res) => {
    const {
        ProductName,
          Location,
          Shift,
          Quantity,
          NoRolls,        
          BatchNo,
          Line,
          Date,
              
    } = req.body;
  
    try {
      const pro = await StockProduction.create({
        ProductName,
          Location,
          Shift,
          Quantity,
          NoRolls,        
          BatchNo,
          Line,
          Date,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllStockproduction = async (req, res) => {
    try {
      const Cat = await StockProduction.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleStockproduction = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await StockProduction.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateStockproduction = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
          Location,
          Shift,
          Quantity,
          NoRolls,        
          BatchNo,
          Line,
          Date,
    } = req.body;
  
    try {
      // Update the database with the new image path
      StockProduction.update(
        {
            ProductName,
            Location,
            Shift,
            Quantity,
            NoRolls,        
            BatchNo,
            Line,
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
  
  const DeleteStockproduction = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await StockProduction.destroy({
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
      CreateStockproduction,
      GetAllStockproduction,
      GetSingleStockproduction,
      UpdateStockproduction,
      DeleteStockproduction,
  };
  