const {
    Recycle
  } = require("../../../models/Pillar Pole/ProductionModels/Recycle");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await Recycle.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateRecycle = async (req, res) => {
    const {
        ProductName,
          Location,
          Machine,
          NameOperator,
          Shift,
          Quantity,
          NoItems,
          Waste,
          BatchNo,
          Type,
          Date,
    } = req.body;
  
    try {
      const pro = await Recycle.create({
        ProductName,
          Location,
          Machine,
          NameOperator,
          Shift,
          Quantity,
          NoItems,
          Waste,
          BatchNo,
          Type,
          Date,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllRecycles = async (req, res) => {
    try {
      const Cat = await Recycle.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };
  
  const GetSingleRecycle = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await Recycle.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateRecycle = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
        Location,
        Machine,
        OperatorName,
        Shift,
        Quantity,
        NoItems,
        Waste,
        BatchNo,
        Type,
        Date,
    } = req.body;
  
    try {
      // Update the database with the new image path
      Recycle.update(
        {
        ProductName,
          Location,
          Machine,
          OperatorName,
          Shift,
          Quantity,
          NoItems,
          Waste,
          BatchNo,
          Type,
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
  
  const DeleteRecycle = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Recycle.destroy({
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
      CreateRecycle,
      GetAllRecycles,
      GetSingleRecycle,
      UpdateRecycle,
      DeleteRecycle,
  };
  