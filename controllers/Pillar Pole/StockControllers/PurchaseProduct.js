const { PurchaseProduct } = require("../../../models/Pillar Pole/StockModels/PurchaseProduct");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const AddPurchase = async (req, res) => {
  

  const { ProductName, 
            Category ,
            CostPrice,
            QuantityBought,
            SellingPrice,
            InvoiceNumber,
            Location,
            DatePurchased
} = req.body;

  try {

    const pro = await PurchaseProduct.create({
        ProductName, 
            Category ,
            CostPrice,
            QuantityBought,
            SellingPrice,
            InvoiceNumber,
            Location,
            DatePurchased
        
        
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllPurchase = async (req, res) => {
  try {
    const Cat = await PurchaseProduct.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleProducts = async(req,res)=>{
  const ProductId = req.params.id
  
  try {

    const Getone = await PurchaseProduct.findOne({where: {id:ProductId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateProducts = async (req, res) => {
    const Productid = req.params.id;
    
    const {ProductName, 
      Category ,
      CostPrice,
      QuantityBought,
      SellingPrice,
      InvoiceNumber,
      Location,
      DatePurchased } = req.body;

  try {
    // Update the database with the new image path
    PurchaseProduct.update(
      {
        Category,
        TotalQuantity,
        CostPrice,
        SellingPrice,
        InvoiceNumber,
        DatePurchased,
        QtyIn,
        QtyOut,
        Balance
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



const DeleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await PurchaseProduct.destroy({
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
    AddPurchase,
    GetAllPurchase ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts
};
