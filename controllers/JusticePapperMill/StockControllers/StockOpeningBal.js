const {
    JStockOpeningBal
  } = require("../../../models/JusticePapperMill/StockModels/StockOpeningBal");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await JStockOpeningBal.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateStockproduction = async (req, res) => {
    const {
        ProductName,
          Location,
          Quantity,
          CostPrice,
          Description,
          TransNo,
          Category,
          Date
              
    } = req.body;
  
    try {
      const pro = await JStockOpeningBal.create({
        ProductName,
          Location,
          Quantity,
          CostPrice,
          Description,
          TransNo,
          Category,
          Date
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
      const Cat = await JStockOpeningBal.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleStockproduction = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await JStockOpeningBal.findOne({ where: { id: ProductId } }).then(
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
          Quantity,
          CostPrice,
          Description,
          TransNo,
          Category,
          Date
    } = req.body;
  
    try {
      // Update the database with the new image path
      JStockOpeningBal.update(
        {
            ProductName,
            Location,
            Quantity,
            CostPrice,
            Description,
            TransNo,
            Category,
            Date
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
  
      const Cat = await JStockOpeningBal.destroy({
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
  