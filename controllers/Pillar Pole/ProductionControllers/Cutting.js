const {
    Cutting
  } = require("../../../models/Pillar Pole/ProductionModels/Cutting");
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
  
  const CreateCutting = async (req, res) => {
    const {
        ProductName,
          NoBundles,
          Date,
          NameOperator,
          Shift,
          Quantity,
          Waste,
          Location,
          Machine,
          Category,
          Customer,
          MaterialUsed,
          QtyUsed,
          NoRolls,
          CoreWeight,
          NoItems,
          BatchNo,
          Key,
          Type,
    } = req.body;
  
    try {
      const pro = await Cutting.create({
        ProductName,
        NoBundles,
        Date,
        NameOperator,
        Shift,
        Quantity,
        Waste,
        Location,
        Machine,
        Category,
        Customer,
        MaterialUsed,
        QtyUsed,
        NoRolls,
        CoreWeight,
        NoItems,
        BatchNo,
        Key,
        Type
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllCuttings = async (req, res) => {
    try {
      const Cat = await Cutting.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleCutting = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await Cutting.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateCutting = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
        NoBundles,
        Date,
        NameOperator,
        Shift,
        Quantity,
        Waste,
        Location,
        Machine,
        Category,
        Customer,
        MaterialUsed,
        QtyUsed,
        NoRolls,
        CoreWeight,
        NoItems,
        BatchNo,
        Key,
        Type,
    } = req.body;
  
    try {
      // Update the database with the new image path
      Cutting.update(
        {
            ProductName,
            NoBundles,
            Date,
            NameOperator,
            Shift,
            Quantity,
            Waste,
            Location,
            Machine,
            Category,
            Customer,
            MaterialUsed,
            QtyUsed,
            NoRolls,
            CoreWeight,
            NoItems,
            BatchNo,
            Key,
            Type,
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
  
  const DeleteCutting = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Cutting.destroy({
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
      CreateCutting,
      GetAllCuttings,
      GetSingleCutting,
      UpdateCutting,
      DeleteCutting,
  };
  