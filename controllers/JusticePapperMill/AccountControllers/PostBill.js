const {
    JPostBill
  } = require("../../../models/JusticePapperMill/AccountsModels/PostBill");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await JPostBill.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreatePostBill = async (req, res) => {
    const {
        ExpenseAccountName,
          Description,
          Date,
          Quantity,
          UnitCost,
          InvoiceNo,
          Company,
          Location,
    } = req.body;
  
    try {
      const pro = await JPostBill.create({
        ExpenseAccountName,
          Description,
          Date,
          Quantity,
          UnitCost,
          InvoiceNo,
          Company,
          Location,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllPostBills = async (req, res) => {
    try {
      const Cat = await JPostBill.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSinglePostBill = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await JPostBill.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdatePostBill = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ExpenseAccountName,
          Description,
          Date,
          Quantity,
          UnitCost,
          InvoiceNo,
          Company,
          Location,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JPostBill.update(
        {
            ExpenseAccountName,
          Description,
          Date,
          Quantity,
          UnitCost,
          InvoiceNo,
          Company,
          Location,
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
  
  const DeletePostBill = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JPostBill.destroy({
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
      CreatePostBill,
      GetAllPostBills,
      GetSinglePostBill,
      UpdatePostBill,
      DeletePostBill,
  };
  