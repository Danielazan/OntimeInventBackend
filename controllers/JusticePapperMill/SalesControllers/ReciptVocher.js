const {
    ReciptVocher
  } = require("../../../models/JusticePapperMill/SalesModels/ReciptVocher");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await ReciptVocher.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateReciptVocher = async (req, res) => {
    const {
        ProductName,
      Quantity,
      UnitPrice,
 
      Date,
      Customer,
      PhoneNumbr,
      Address,
      Credit,
      OldBalance,
      InvoiceNo,
      AmountPaid,
   
      TransactionMode,
      TransactionAccount,
    } = req.body;
  
    try {
      const pro = await ReciptVocher.create({
        ProductName,
      Quantity,
      UnitPrice,
 
      Date,
      Customer,
      PhoneNumbr,
      Address,
      Credit,
      OldBalance,
      InvoiceNo,
      AmountPaid,
   
      TransactionMode,
      TransactionAccount,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    // deleteTable()
  };
  
  const GetAllReciptVochers = async (req, res) => {
    try {
      const Cat = await ReciptVocher.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleReciptVocher = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await ReciptVocher.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateReciptVocher = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
      Quantity,
      UnitPrice,
 
      Date,
      Customer,
      PhoneNumbr,
      Address,
      Credit,
      OldBalance,
      InvoiceNo,
      AmountPaid,
   
      TransactionMode,
      TransactionAccount,
    } = req.body;
  
    try {
      // Update the database with the new image path
      ReciptVocher.update(
        {
            ProductName,
      Quantity,
      UnitPrice,
 
      Date,
      Customer,
      PhoneNumbr,
      Address,
      Credit,
      OldBalance,
      InvoiceNo,
      AmountPaid,
   
      TransactionMode,
      TransactionAccount,
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
  
  const DeleteReciptVocher = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await ReciptVocher.destroy({
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
      CreateReciptVocher,
      GetAllReciptVochers,
      GetSingleReciptVocher,
      UpdateReciptVocher,
      DeleteReciptVocher,
  };
  