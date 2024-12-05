const { EProductRecieved } = require("../../../models/EfficientLPG/ProductModels/StockRecieved");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateProductRecieved = async (req, res) => {
  

  const { 
    ProductName,
      QtyRecived,
      PurchasePrice,
      Location,
      Company,
      InvoiceNo,
      Date,
   } = req.body;

  try {

    const pro = await EProductRecieved.create({
        
        ProductName,
      QtyRecived,
      PurchasePrice,
      Location,
      Company,
      InvoiceNo,
      Date,
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllProductRecieved = async (req, res) => {
  try {
    const Cat = await EProductRecieved.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleProductRecieved = async(req,res)=>{
  const PumpId = req.params.id
  
  try {

    const Getone = await EProductRecieved.findOne({where: {id:PumpId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateProductRecieved = async (req, res) => {
    const Pumpid = req.params.id;
    
    const {
        ProductName,
      QtyRecived,
      PurchasePrice,
      Location,
      Company,
      InvoiceNo,
      Date,
    } = req.body;

  try {
    // Update the database with the new image path
    EProductRecieved.update(
      {
        ProductName,
      QtyRecived,
      PurchasePrice,
      Location,
      Company,
      InvoiceNo,
      Date,
      },
      { where: { id: Pumpid } }
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



const DeleteProductRecieved = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await EProductRecieved.destroy({
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
    CreateProductRecieved,
    GetAllProductRecieved ,
    GetSingleProductRecieved,
    DeleteProductRecieved,
    UpdateProductRecieved
};
