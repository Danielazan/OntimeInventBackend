const { JProduct } = require("../../../models/JusticePapperMill/StockModels/Product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateProducts = async (req, res) => {
  

  const { ProductName, Category } = req.body;

  try {

    const pro = await JProduct.create({
        ProductName,
        Category,
        TotalQuantity:0,
        CostPrice:0,
        SellingPrice:0,
        InvoiceNumber:0,
        DatePurchased:0,
        QtyIn:0,
        QtyOut:0,
        Balance:0
        
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const Cat = await JProduct.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleProducts = async(req,res)=>{
  const ProductId = req.params.id
  
  try {

    const Getone = await JProduct.findOne({where: {id:ProductId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateProductsSales = async (req, res) => {
  const Name = req.params.Name;
  
  const {
      
    Quantity } = req.body;

try {
  const Getone = await JProduct.findOne({where: {ProductName: Name}})
   
  const Total = await Getone.TotalQuantity -Quantity
  const out = await Getone.QtyOut + Quantity

  console.log(Total)
  JProduct.update(
    {
      TotalQuantity:Total,
      QtyOut:out
    },
    { where: { ProductName: Name } }
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


const UpdateProducts = async (req, res) => {
    const Productid = req.params.id;
    
    const {ProductName,
        Category,
        TotalQuantity,
        CostPrice,
        SellingPrice,
        InvoiceNumber,
        DatePurchased,
        QtyIn,
        QtyOut,
        Balance } = req.body;

  try {
    // Update the database with the new image path
    JProduct.update(
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
    
    const Cat = await JProduct.destroy({
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
    CreateProducts,
    GetAllProducts ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts,
    UpdateProductsSales
};
