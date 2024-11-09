const { PurchaseStocks } = require("../../../models/JusticePapperMill/StockModels/PurchaseStocks");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await PurchaseStocks.drop();
      console.log("Table deleted successfully.");
  } catch (error) {
      console.error("Error deleting table:", error);
  }
}

const AddPurchase = async (req, res) => {
  

  const { ProductName, 
            Category ,
            CostPrice,
            QuantityBought,
            SellingPrice,
            InvoiceNumber,
            Location,
            DatePurchased,
            Company
} = req.body;

  try {

    const pro = await PurchaseStocks.create({
        ProductName, 
            Category ,
            CostPrice,
            QuantityBought,
            SellingPrice,
            InvoiceNumber,
            Location,
            DatePurchased,
            Company
        
        
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
    const Cat = await PurchaseStocks.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleProducts = async(req,res)=>{
  const ProductId = req.params.id
  
  try {

    const Getone = await PurchaseStocks.findOne({where: {id:ProductId}}).then(result =>{
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
      DatePurchased,Company } = req.body;

  try {
    // Update the database with the new image path
    PurchaseStocks.update(
      {
        Category,
        TotalQuantity,
        CostPrice,
        SellingPrice,
        InvoiceNumber,
        DatePurchased,
        QtyIn,
        QtyOut,
        Balance,
        Company
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
    
    const Cat = await PurchaseStocks.destroy({
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
