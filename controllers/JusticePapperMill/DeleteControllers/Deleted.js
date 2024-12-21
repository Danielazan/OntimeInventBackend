const {
    DeletedItems
  } = require("../../../models/JusticePapperMill/DelModels/Deleted");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await DeletedItems.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateDeleteItem = async (req, res) => {
    const {
        Type,
        Data,
        DeletedBy
    } = req.body;
  
    try {
      const pro = await DeletedItems.create({
        Type,
        Data,
        DeletedBy
        
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllDeleteItems = async (req, res) => {
    try {
      const Cat = await DeletedItems.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleDeleteItem = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await DeletedItems.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateDeleteItem = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        Type,
        Data,
        DeletedBy
    } = req.body;
  
    try {
      // Update the database with the new image path
      DeletedItems.update(
        {
            Type,
            Data,
            DeletedBy
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
  
  const DeleteDeleteItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await DeletedItems.destroy({
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
      CreateDeleteItem,
      GetAllDeleteItems,
      GetSingleDeleteItem,
      UpdateDeleteItem,
      DeleteDeleteItem,
  };
  