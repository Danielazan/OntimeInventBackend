const {
    Sales
  } = require("../../../models/Pillar Pole/SalesModel/Sales");
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
  
  const CreateSales = async (req, res) => {
    const {
        ProductName,
          Category,
          Quantity,
          UnitPrice,
          Location,
          Date,
          Customer,
          PhoneNumbr,
          Address,
          Credit,
          OldBalance,
          InvoiceNo,
          NoItems,
          AmountPaid,
          CustomerBank,
          TransactionMode,
          TransactionAccount,
          Remark,
    } = req.body;
  
    try {
      const pro = await Sales.create({
        ProductName,
          Category,
          Quantity,
          UnitPrice,
          Location,
          Date,
          Customer,
          PhoneNumbr,
          Address,
          Credit,
          OldBalance,
          InvoiceNo,
          NoItems,
          AmountPaid,
          CustomerBank,
          TransactionMode,
          TransactionAccount,
          Remark,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllSaless = async (req, res) => {
    try {
      const Cat = await Sales.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleSales = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await Sales.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateSales = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
          Category,
          Quantity,
          UnitPrice,
          Location,
          Date,
          Customer,
          PhoneNumbr,
          Address,
          Credit,
          OldBalance,
          InvoiceNo,
          NoItems,
          AmountPaid,
          CustomerBank,
          TransactionMode,
          TransactionAccount,
          Remark,
    } = req.body;
  
    try {
      // Update the database with the new image path
      Sales.update(
        {
            ProductName,
          Category,
          Quantity,
          UnitPrice,
          Location,
          Date,
          Customer,
          PhoneNumbr,
          Address,
          Credit,
          OldBalance,
          InvoiceNo,
          NoItems,
          AmountPaid,
          CustomerBank,
          TransactionMode,
          TransactionAccount,
          Remark,
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
  
  const DeleteSales = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Sales.destroy({
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
      CreateSales,
      GetAllSaless,
      GetSingleSales,
      UpdateSales,
      DeleteSales,
  };
  