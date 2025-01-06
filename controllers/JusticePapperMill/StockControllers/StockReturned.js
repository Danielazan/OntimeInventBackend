const {
    JStockReturn
  } = require("../../../models/JusticePapperMill/StockModels/StockReturn");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await JStockReturn.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateReturnProduct = async (req, res) => {
    const {
        ProductName,
          QtyRecived,
          Unitprice,
          PurchasePrice,
          Location,
          Customer,
          InvoiceNo,
          ItemsNo,
          Date,
    } = req.body;
  
    try {
      const pro = await JStockReturn.create({
        ProductName,
          QtyRecived,
          Unitprice,
          PurchasePrice,
          Location,
          Customer,
          InvoiceNo,
          ItemsNo,
          Date,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllReturnProducts = async (req, res) => {
    try {
      const Cat = await JStockReturn.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleReturnProduct = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await JStockReturn.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateReturnProduct = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
          QtyRecived,
          Unitprice,
          PurchasePrice,
          Location,
          Customer,
          InvoiceNo,
          ItemsNo,
          Date,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JStockReturn.update(
        {
            ProductName,
          QtyRecived,
          Unitprice,
          PurchasePrice,
          Location,
          Customer,
          InvoiceNo,
          ItemsNo,
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
  
  const DeleteReturnProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JStockReturn.destroy({
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
    CreateReturnProduct,
    GetAllReturnProducts,
    GetSingleReturnProduct,
    UpdateReturnProduct,
    DeleteReturnProduct,
  };
  