const {
    Refund
  } = require("../../../models/Pillar Pole/CustomerModels/Refund");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await Refund.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateRefund = async (req, res) => {
    const {
        CustomerName,
          Quantity,
          UnitPrice,
          Date,
          TransactionMode,
          TransactionAccount,
          Location,
          InvoiceNumber,
    } = req.body;
  
    try {
      const pro = await Refund.create({
        CustomerName,
          Quantity,
          UnitPrice,
          Date,
          TransactionMode,
          TransactionAccount,
          Location,
          InvoiceNumber,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllRefunds = async (req, res) => {
    try {
      const Cat = await Refund.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleRefund = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await Refund.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateRefund = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        CustomerName,
          Quantity,
          UnitPrice,
          Date,
          TransactionMode,
          TransactionAccount,
          Location,
          InvoiceNumber,
    } = req.body;
  
    try {
      // Update the database with the new image path
      Refund.update(
        {
            CustomerName,
          Quantity,
          UnitPrice,
          Date,
          TransactionMode,
          TransactionAccount,
          Location,
          InvoiceNumber,
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
  
  const DeleteRefund = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Refund.destroy({
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
      CreateRefund,
      GetAllRefunds,
      GetSingleRefund,
      UpdateRefund,
      DeleteRefund,
  };
  