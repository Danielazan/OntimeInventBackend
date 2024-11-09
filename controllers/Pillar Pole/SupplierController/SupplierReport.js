const {
    PSupplierReport,
  } = require("../../../models/Pillar Pole/SupplierModels/SupplierReport");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  const                                                                                                                                                                                           CreateSupplierReport = async (req, res) => {
    const {
        SupplierName,
          Credit,
          Debit
    } = req.body;
  
    try {
      const pro = await PSupplierReport.create({
         SupplierName,
          Credit,
          Debit
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllTSupplierReport = async (req, res) => {
    try {
      const Cat = await PSupplierReport.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleSupplierReport = async (req, res) => {
    const TramsferId = req.params.id;
  
    try {
      const Getone = await PSupplierReport.findOne({ where: { id: TramsferId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateSupplierReport = async (req, res) => {
    const Transferid = req.params.id;
  
    const {
         SupplierName,
          Credit,
          Debit
    } = req.body;
  
    try {
      // Update the database with the new image path
      PSupplierReport.update(
        {
            SupplierName,
            Credit,
            Debit
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
  
  const DeleteSupplierReport = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Product.destroy({
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
      CreateSupplierReport,
      GetAllTSupplierReport,
      GetSingleSupplierReport,
      UpdateSupplierReport,
      DeleteSupplierReport,
  };
  