const {
    EProduct
  } = require("../../../models/EfficientLPG/ProductModels/NewProduct");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await EProduct.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateNewProduct = async (req, res) => {
    const {
        ProductName,
      Retalprice,
      CostPrice,
      ReOrderLevel
    } = req.body;
  
    try {
      const pro = await EProduct.create({
        ProductName,
      Retalprice,
      CostPrice,
      ReOrderLevel
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllNewProducts = async (req, res) => {
    try {
      const Cat = await EProduct.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleNewProduct = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await EProduct.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateNewProduct = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        ProductName,
        Retalprice,
        CostPrice,
        ReOrderLevel
    } = req.body;
  
    try {
      // Update the database with the new image path
      EProduct.update(
        {
            ProductName,
        Retalprice,
        CostPrice,
      ReOrderLevel
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
  
  const DeleteNewProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await EProduct.destroy({
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
      CreateNewProduct,
      GetAllNewProducts,
      GetSingleNewProduct,
      UpdateNewProduct,
      DeleteNewProduct,
  };
  