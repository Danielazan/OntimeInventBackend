const {
    JRefund
  } = require("../../../models/JusticePapperMill/CustomersModels/Refund");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await JRefund.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateRefund = async (req, res) => {
    const {
        CustomerName,
      OldBalance,
      AmoundRefunded,
      Date,
      PaymentMode,
      TransactionAccount,
      Location,
      ReceiptNumber,
    } = req.body;
  
    try {
      const pro = await JRefund.create({
        CustomerName,
      OldBalance,
      AmoundRefunded,
      Date,
      PaymentMode,
      TransactionAccount,
      Location,
      ReceiptNumber,
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
      const Cat = await JRefund.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleRefund = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await JRefund.findOne({ where: { id: ProductId } }).then(
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
      OldBalance,
      AmoundRefunded,
      Date,
      PaymentMode,
      TransactionAccount,
      Location,
      ReceiptNumber,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JRefund.update(
        {
            CustomerName,
      OldBalance,
      AmoundRefunded,
      Date,
      PaymentMode,
      TransactionAccount,
      Location,
      ReceiptNumber,
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
  
      const Cat = await JRefund.destroy({
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
  