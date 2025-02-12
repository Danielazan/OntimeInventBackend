const {
    PillarStockUsed,
  } = require("../../../models/Pillar Pole/StockModels/StockUsed");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
      await PillarStockUsed.drop();
      console.log("Table deleted successfully.");
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  }

  const CreateStockUsed = async (req, res) => {
    const {
          MaterialUsed,
          Particulars,
          IssueNumber,
          Date,
          Location,
          OperatorName,
          Machine
    } = req.body;

    const materialused = JSON.parse(MaterialUsed);
  
    try {

      await(materialused.map(async (mat) => {
          const pro = await PillarStockUsed.create({
              ProductName:mat.plainmaterialused,
              Roll:mat.Rollused,
              QuantityUsed:mat.Quatity,
              UsedFor:Particulars,
              Category:mat.category,
              IssueNumber,
              Date,
              Location,
              OperatorName,
              Machine
      });
      }));
      res.status(200).json({ message: "Record Posted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllTStockUsed = async (req, res) => {
    try {
      const Cat = await PillarStockUsed.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleStockUsed = async (req, res) => {
    const TramsferId = req.params.id;
  
    try {
      const Getone = await PillarStockUsed.findOne({ where: { id: TramsferId } }).then(
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
      PillarStockUsed.update(
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
  
      const Cat = await PillarStockUsed.destroy({
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
  