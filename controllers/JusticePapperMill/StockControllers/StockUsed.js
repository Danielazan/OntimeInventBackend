const {
    JStockUsed,
  } = require("../../../models/JusticePapperMill/StockModels/StockUsed");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  const CreateStockUsed = async (req, res) => {
    const {
        ProductName,
          PurchasePrice,
          QuantityUsed,
          UsedFor,
          Category,
          IssueNumber,
          Date,
          Location,
    } = req.body;
  
    try {
      const pro = await JStockUsed.create({
        ProductName,
        PurchasePrice,
        QuantityUsed,
        UsedFor,
        Category,
        IssueNumber,
        Date,
        Location,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllTStockUsed = async (req, res) => {
    try {
      const Cat = await JStockUsed.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleStockUsed = async (req, res) => {
    const TramsferId = req.params.id;
  
    try {
      const Getone = await JStockUsed.findOne({ where: { id: TramsferId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateStockUsed = async (req, res) => {
    const Transferid = req.params.id;
  
    const {
        ProductName,
        PurchasePrice,
        QuantityUsed,
        UsedFor,
        Category,
        IssueNumber,
        Date,
        Location,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JStockUsed.update(
        {
            ProductName,
            PurchasePrice,
            QuantityUsed,
            UsedFor,
            Category,
            IssueNumber,
            Date,
            Location,
        },
        { where: { id: Transferid } }
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
  
  const DeleteStockUsed = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JStockUsed.destroy({
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
      CreateStockUsed,
      GetAllTStockUsed,
      GetSingleStockUsed,
      UpdateStockUsed,
      DeleteStockUsed,
  };
  