const { JProduct,JStockLedger } = require("../../../models/JusticePapperMill/StockModels/Product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await JProduct.drop();
      console.log("Table deleted successfully.");
  } catch (error) {
      console.error("Error deleting table:", error);
  }
}

const CreateProducts = async (req, res) => {
  

  const { ProductName, Category } = req.body;

  try {

    const pro = await JProduct.create({
      ProductName,
      TotalQuantity:"0",
      CostPrice:"0",
      SellingPrice:"0",
      Category,
      InvoiceNumber:"0",
      DatePurchased:"0",
      TotalQtySold:"0",
      TotalAmountQtySold:"0",
      TotalQtyProduced:"0",
        
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
    const Cat = await JProduct.findAll({
      include: [{
          model: JStockLedger,
          // as: 'JStockLedger' // Use the alias if you defined one in your model
      }]
  }).then((result) => {
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

const GetSingleProductsByName = async(req,res)=>{
  const {ProductNamed} = req.body
  
  try {

    const Getone = await JProduct.findOne({where: {ProductName:ProductNamed}}).then(result =>{
      res.status(200).json(result)
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const GetAllStockCard = async (req, res) => {
  try {
    const Cat = await JStockLedger.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateSalePrice = async (req, res) => {
  const id = req.params.id;
  
  const {
      price
     } = req.body;

try {
  const Getone = await JProduct.findOne({where: {id:id}})

   await JProduct.update(
    {
      SellingPrice:price
    },
    { where: { id } }
  )
    .then(() => {
      res.status(200).json({ message: "Record updated successfully" });
    })
    .catch((dbError) => {
      res.status(500).json({ error: dbError.message });
    });

    

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",reload)
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

const UpdateProductsPurchase = async (req, res) => {
  const Name = req.params.Name;
  
  const {
      ProductName,
      TotalQuantity,
      CostPrice,
      SellingPrice,
      Category,
      InvoiceNumber,
      DatePurchased,  
    Quantity } = req.body;

try {
  const Getone = await JProduct.findOne({where: {ProductName: Name}})

  // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name)
   
  const Total = await Number(Getone.TotalQuantity) + Number(Quantity)
  // const out = await Getone.QtyOut + Quantity

  JStockLedger.create({
    Date: DatePurchased,
    InvoiceNo: InvoiceNumber,
    Particulars:"From Stock Purchase",
    QtyIn: Quantity,
    QtyOut: 0,
    Balance: Total,
    StockName:Getone.id // Use ProductName from Getone
});

  // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

   JProduct.update(
    {
      ProductName,
      TotalQuantity:Total,
      CostPrice,
      SellingPrice,
      Category,
      InvoiceNumber,
      DatePurchased,  
    },
    { where: { ProductName: Name } }
  )
    .then(() => {
      res.status(200).json({ message: "Record updated successfully" });
    })
    .catch((dbError) => {
      res.status(500).json({ error: dbError.message });
    });
    

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",reload)
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

const UpdateProductSales = async (req, res) => {
  const Name = req.params.Name;
  
  const {
      Date,
      Quantity,
      InvoiceNumber, 
      Particulars,
      AmountPaid
     } = req.body;

try {
  const Getone = await JProduct.findOne({where: {ProductName: Name}})

  // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name)
   
  const Total = await Number(Getone.TotalQuantity) - Number(Quantity)
  

  JStockLedger.create({
    Date: Date,
    InvoiceNo: InvoiceNumber,
    Particulars,
    QtyIn: "0",
    QtyOut: Quantity,
    Balance: Total,
    StockName:Getone.id // Use ProductName from Getone
});

  // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

   JProduct.update(
    {
      TotalQtySold:Number(Getone.TotalQtySold) + Number(Quantity),
      TotalAmountQtySold:Number(Getone.TotalAmountQtySold) + Number(AmountPaid),
      TotalQuantity:Total,
      InvoiceNumber,
    },
    { where: { ProductName: Name } }
  )
    .then(() => {
      res.status(200).json({ message: "Record updated successfully" });
    })
    .catch((dbError) => {
      res.status(500).json({ error: dbError.message });
    });
    

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",reload)
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

const UpdateProductByProduction = async (req, res) => {
  const Name = req.params.Name;
  
  const {
      Date,
      Quantity,
      InvoiceNumber,
      DatePurchased,  
      Particulars,
      SellingPrice
     } = req.body;

try {
  const Getone = await JProduct.findOne({where: {ProductName: Name}})

  // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name)
   
  const Total = await Number(Getone.TotalQuantity) + Number(Quantity)
 

  JStockLedger.create({
    Date: Date,
    InvoiceNo: InvoiceNumber,
    Particulars,
    QtyIn: Quantity,
    QtyOut:"0" ,
    Balance: Total,
    StockName:Getone.id // Use ProductName from Getone
});

  // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

   JProduct.update(
    {
      TotalQtyProduced:Number(Getone.TotalQtyProduced) + Number(Quantity),
      TotalQuantity:Total,
      InvoiceNumber,
      SellingPrice
    },
    { where: { ProductName: Name } }
  )
    .then(() => {
      res.status(200).json({ message: "Record updated successfully" });
    })
    .catch((dbError) => {
      res.status(500).json({ error: dbError.message });
    });
    

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",reload)
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

const UpdateProductByBalance = async (req, res) => {
  const Name = req.params.Name;
  
  const {
      Date,
      Quantity,
      InvoiceNumber,  
      Particulars,
     } = req.body;

try {
  const Getone = await JProduct.findOne({where: {ProductName: Name}})

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name)
   
  const Total = await Number(Getone.TotalQuantity) + Number(Quantity)
 

  JStockLedger.create({
    Date: Date,
    InvoiceNo: InvoiceNumber,
    Particulars,
    QtyIn: Quantity,
    QtyOut:"0" ,
    Balance: Total,
    StockName:Getone.id 
});

   JProduct.update(
    {
      TotalQuantity:Total,
      InvoiceNumber
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
      TotalQuantity,
      CostPrice,
      SellingPrice,
      Category,
      InvoiceNumber,
      DatePurchased,} = req.body;

  try {
    // Update the database with the new image path
    JProduct.update(
      {
        ProductName,
        TotalQuantity,
        CostPrice,
        SellingPrice,
        Category,
        InvoiceNumber,
        DatePurchased,
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
    UpdateProductsPurchase,
    GetSingleProductsByName,
    UpdateProductSales,
    GetAllStockCard,
    UpdateProductByProduction,
    UpdateProductByBalance,
    UpdateSalePrice 
};
