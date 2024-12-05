const {
    JDriverReg
  } = require("../../../models/JusticePapperMill/SalesModels/DriverReg");
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
  
  const CreateDriverReg = async (req, res) => {
    const {
        Name,
      VechileNo,
      PhoneNumber,
      Model,
      Capacity,
    } = req.body;
  
    try {
      const pro = await JDriverReg.create({
        Name,
      VechileNo,
      PhoneNumber,
      Model,
      Capacity,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllDriverRegs = async (req, res) => {
    try {
      const Cat = await JDriverReg.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleDriverReg = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await JDriverReg.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateDriverReg = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        Name,
      VechileNo,
      PhoneNumber,
      Model,
      Capacity,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JDriverReg.update(
        {
            Name,
            VechileNo,
            PhoneNumber,
            Model,
            Capacity,
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
  
  const DeleteDriverReg = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JDriverReg.destroy({
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
      CreateDriverReg,
      GetAllDriverRegs,
      GetSingleDriverReg,
      UpdateDriverReg,
      DeleteDriverReg,
  };
  