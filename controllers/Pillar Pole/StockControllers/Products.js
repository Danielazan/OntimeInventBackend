const {
  Product,
  PStockLedger,
  CompanyLocation,
  ProductLocation,
} = require("../../../models/Pillar Pole/StockModels/Product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sequelize = require("../../../database");

async function deleteTable() {
  try {
    await PStockLedger.drop();
    console.log("Table deleted successfully.");
  } catch (error) {
    console.error("Error deleting table:", error);
  }
}

const CreateProducts = async (req, res) => {
  const { ProductName, Category } = req.body;

  try {
    const [product, created] = await Product.findOrCreate({
      where: { ProductName },
      defaults: {
        TotalQuantity: 0,
        CostPrice: 0,
        SellingPrice: 0,
        Category,
        InvoiceNumber: "0",
        DatePurchased: "0",
        TotalQtySold: 0,
        TotalAmountQtySold: 0,
        TotalQtyProduced: 0,
      },
    });

    res.status(200).json({ product, created });
  } catch (error) {
    console.error("Error in findOrCreate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: CompanyLocation,
          // through: { attributes: ["quantity"] }, // Include the quantity from ProductLocation
          include: [
            {
              model: PStockLedger,
              // You can add conditions here if needed
            },
          ],
        },
        {
          model: PStockLedger,
          // You can add separate conditions for product-specific ledger entries
        },
      ],
      order: [["createdAt", "DESC"]], // This replaces the reverse() method
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleProducts = async (req, res) => {
  const ProductId = req.params.id;

  try {
    const Getone = await Product.findOne({ where: { id: ProductId } }).then(
      (result) => {
        res.status(200).json({ result });
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleProductsByName = async (req, res) => {
  const { ProductNamed } = req.body;

  try {
    const Getone = await Product.findOne({
      where: { ProductName: ProductNamed },
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const CreateLocatoin = async (req, res) => {
  const { Name } = req.body;

  try {
    const Locatoin = await CompanyLocation.create({
      LocationName:Name
    })

    res.status(200).json(Locatoin);
  } catch (error) {
    console.error("Error in findOrCreate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

const GetAllLocation = async (req, res) => {
  try {
    const Cat = await CompanyLocation.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllStockCard = async (req, res) => {
  try {
    const Cat = await PStockLedger.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateProductsPurchase = async (req, res) => {
  const Name = req.params.Name;

  const {
    Location,
    CostPrice,
    SellingPrice,
    Category,
    InvoiceNumber,
    DatePurchased,
    Quantity,
  } = req.body;

  try {
    const Getone = await Product.findOne({ where: { ProductName: Name } });

    const [location, locationCreated] = await CompanyLocation.findOrCreate({
      where: { LocationName: Location },
    });

    const [productLocation, productLocationCreated] =
      await ProductLocation.findOrCreate({
        where: { ProductId: Getone.id, CompanyLocationId: location.id },
        defaults: {
          quantity: 0,
          QtyRem: 0,
          QtySold: 0,
          AmountInCash: 0,
          TransferRecieved: 0,
          TransferGiven: 0,
        },
      });

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name)

    const Total = (await Number(Getone.TotalQuantity)) + Number(Quantity);
    const newLocationQuantity = productLocation.quantity + Number(Quantity);

    await productLocation.update(
      {
        quantity: newLocationQuantity,
        QtyRem: productLocation.QtyRem + Number(Quantity),
      },
      { where: { id: productLocation.id } }
    );

    PStockLedger.create({
      Date: DatePurchased,
      InvoiceNo: InvoiceNumber,
      Particulars: "From Stock Purchase",
      QtyIn: Quantity,
      QtyOut: 0,
      Balance: productLocation.QtyRem,
      CompanyLocationId: location.id,
      ProductId: Getone.id,
      // Use ProductName from Getone
    });

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

    Product.update(
      {
        TotalQuantity: Total,
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

const UpdateProductsTransfer = async (req, res) => {
  const Name = req.params.Name;

  const {
    From,
    To,
    CostPrice,
    Category,
    InvoiceNumber,
    DatePurchased,
    Quantity,
  } = req.body;

  try {
    const Getone = await Product.findOne({ where: { ProductName: Name } });

    const locationFrom = await CompanyLocation.findOne({ where: { LocationName: From } });

    
    const [productLocationFrom, productLocationfromCreated] = await ProductLocation.findOrCreate({ 
      where: { ProductId: Getone.id, CompanyLocationId: locationFrom.id },
      defaults: {
        quantity: 0,
        QtyRem: 0,
        QtySold: 0,
        AmountInCash: 0,
        TransferRecieved: 0,
        TransferGiven: 0,
      },
    });

    
    
    await productLocationFrom.update(
      {
        QtyRem: Number(productLocationFrom.QtyRem) - Number(Quantity),
        TransferGiven: productLocationFrom.TransferGiven + 1,
      },
      {
        where: { id: productLocationFrom.id},
      }
    );

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name
    const newLocationQuantity = productLocationFrom.quantity - Number(Quantity);

    await PStockLedger.create({
      Date: DatePurchased,
      InvoiceNo: InvoiceNumber,
      Particulars: "From Stock Transfer",
      QtyIn: 0,
      QtyOut: Quantity,
      Balance: productLocationFrom.QtyRem,
      CompanyLocationId: locationFrom.id,
      ProductId: Getone.id,
      // Use ProductName from Getone
    })

    const locationTo = await CompanyLocation.findOne({
      where: { LocationName: To },
    });

    const [productLocationTo, productLocationCreated] = await ProductLocation.findOrCreate({ 
      where: { ProductId: Getone.id, CompanyLocationId: locationTo.id },
      defaults: {
        quantity: 0,
        QtyRem: 0,
        QtySold: 0,
        AmountInCash: 0,
        TransferRecieved: 0,
        TransferGiven: 0,
      },
    });

     await productLocationTo.update(
      {
        QtyRem: productLocationTo.QtyRem + Number(Quantity),
        TransferRecieved: productLocationTo.TransferRecieved + 1,
      },
      {
        where: { id: productLocationTo.id},
      }
    );

    await PStockLedger.create({
      Date: DatePurchased,
      InvoiceNo: InvoiceNumber,
      Particulars: "From Stock Transfer",
      QtyIn: Quantity,
      QtyOut: 0,
      Balance: productLocationTo.QtyRem,
      CompanyLocationId: locationTo.id,
      ProductId: Getone.id,
      // Use ProductName from Getone
    })

    .then(() => {
        res.status(200).json({ productLocationTo});
      })
      .catch((dbError) => {
        res.status(500).json({ error: dbError.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};


const UpdateProductSales = async (req, res) => {
  const Name = req.params.Name;

  const { Date, Quantity, InvoiceNumber, Particulars, AmountPaid,Location } = req.body;

  try {
    const Getone = await Product.findOne({ where: { ProductName: Name } });

    const location = await CompanyLocation.findOne({
      where: { LocationName: Location }
    });

    const [productLocation, productLocationCreated] = await ProductLocation.findOrCreate({ 
      where: { ProductId: Getone.id, CompanyLocationId: location.id },
      defaults: {
        quantity: 0,
        QtyRem: 0,
        QtySold: 0,
        AmountInCash: 0,
        TransferRecieved: 0,
        TransferGiven: 0,
      },
    });


    await productLocation.update(
      {
        QtyRem: Number(productLocation.QtyRem) - Number(Quantity)
      },
      {
        where: { id: productLocation.id},
      }
    );
    

    await PStockLedger.create({
      Date,
      InvoiceNo: InvoiceNumber,
      Particulars: "From Sales",
      QtyIn: 0,
      QtyOut: Quantity,
      Balance: productLocation.QtyRem,
      CompanyLocationId: location.id,
      ProductId: Getone.id,
      // Use ProductName from Getone
    });

    Product.update(
      {
        TotalQtySold: Number(Getone.TotalQtySold) + Number(Quantity),
        TotalAmountQtySold:
          Number(Getone.TotalAmountQtySold) + Number(AmountPaid),
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

const UpdateOnMaterialused = async (req, res) => {
  const Name = req.params.Name;

  const {
    Location,
    MaterialUsed,
    Particulars,
    Date,
    InvoiceNumber,
    Quantity
  } = req.body;

  const materialused = JSON.parse(MaterialUsed);

  try {
    
    await(materialused.map(async (mat) => {
      const Getone = await Product.findOne({ where: { ProductName: mat.plainmaterialused }});

      const location = await CompanyLocation.findOne({ where: { LocationName: Location } });

      const [productLocation, productLocationCreated] =
        await ProductLocation.findOrCreate({
          where: { ProductId: Getone.id, CompanyLocationId: location.id },
          defaults: {
            quantity: 0,
            QtyRem: 0,
            QtySold: 0,
            AmountInCash: 0,
            TransferRecieved: 0,
            TransferGiven: 0,
          },
        });

      await productLocation.update(
        {
          QtyRem: Number(productLocation.QtyRem) - Number(mat.Quatity) // Corrected 'Quatity' to 'Quantity'
        },
        {
          where: { id: productLocation.id },
        }
      );

      await PStockLedger.create({
        Date: Date,
        InvoiceNo: InvoiceNumber,
        Particulars,
        QtyIn: 0,
        QtyOut: mat.Quatity, // Corrected 'Quatity' to 'Quantity'
        Balance: productLocation.QtyRem,
        CompanyLocationId: location.id,
        ProductId: Getone.id,
      })

    }));

    // Update material product outside of the loop
    await UpdateOnMaterialProduct(Name, Quantity, Location, InvoiceNumber, Date);
    
    res.status(200).json({ message: "Materials updated successfully." });
    
  } catch (error) {
    // Rollback the transaction in case of error
    // await transaction.rollback();
    
    res.status(400).json({ error: error.message });
  }
}


const ProcessMat = async (mat,Location)=>{
    const Getone = await Product.findOne({ where: {   ProductName: mat.plainmaterialused } });

      const location = await CompanyLocation.findOne({ where: { LocationName: Location } });

      const [productLocation, productLocationCreated] =
        await ProductLocation.findOrCreate({
          where: { ProductId: Getone.id, CompanyLocationId: location.id },
          defaults: {
            quantity: 0,
            QtyRem: 0,
            QtySold: 0,
            AmountInCash: 0,
            TransferRecieved: 0,
            TransferGiven: 0,
          },
        });

      await productLocation.update(
        {
          QtyRem: Number(productLocation.QtyRem) - Number(mat.Quatity) // Corrected 'Quatity' to 'Quantity'
        },
        {
          where: { id: productLocation.id },
        }
      );

      await PStockLedger.create({
        Date: Date,
        InvoiceNo: InvoiceNumber,
        Particulars,
        QtyIn: 0,
        QtyOut: mat.Quatity, // Corrected 'Quatity' to 'Quantity'
        Balance: productLocation.QtyRem,
        CompanyLocationId: location.id,
        ProductId: Getone.id,
      });
}

const UpdateOnMaterialProduct= async (Name, Qty,Location,InvoiceNumber,Date) => {
  const Getone = await Product.findOne({ where: { ProductName: Name } });
    const location = await CompanyLocation.findOne({ where: { LocationName: Location } });

    // console.log("From UpdateMaterialProduct",location)
    const [productLocation, productLocationCreated] =
      await ProductLocation.findOrCreate({
        where: { ProductId: Getone.id, CompanyLocationId: location.id },
        defaults: {
          quantity: 0,
          QtyRem: 0,
          QtySold: 0,
          AmountInCash: 0,
          TransferRecieved: 0,
          TransferGiven: 0,
        },
      });

    await productLocation.update(
      {
        quantity: Number(productLocation.quantity) + Number(Qty),
        QtyRem: productLocation.QtyRem + Number(Qty),
      },
      { where: { id: productLocation.id } }
    );

    await PStockLedger.create({
      Date:Date, // Assuming you meant to use the Date from the request body
      InvoiceNo: InvoiceNumber,
      Particulars: "Form Stock Production",
      QtyIn: Qty,
      QtyOut: 0,
      Balance: productLocation.QtyRem,
      CompanyLocationId: location.id,
      ProductId: Getone.id,
    });

    await Product.update(
      {
        TotalQuantity:Number(Getone.TotalQuantity) + Number(Qty),
        TotalQtyProduced:Number(Getone.TotalQtyProduced) + Number(Qty)
      },
      { where: { ProductName: Name } }
    );
}

const UpdateProductByRecycle = async (req, res) => {
  const Name = req.params.Name;

  const {
    Date,
    Quantity,
    InvoiceNumber,
    Location,
  } = req.body;

  try {
    const Getone = await Product.findOne({ where: { ProductName: Name } });

    const location = await CompanyLocation.findOne({ where: { LocationName: Location } });


    // console.log("From UpdateMaterialProduct",location)
    const [productLocation, productLocationCreated] =
      await ProductLocation.findOrCreate({
        where: { ProductId: Getone.id, CompanyLocationId: location.id },
        defaults: {
          quantity: 0,
          QtyRem: 0,
          QtySold: 0,
          AmountInCash: 0,
          TransferRecieved: 0,
          TransferGiven: 0,
        },
      });

      await productLocation.update(
        {
          quantity: Number(productLocation.quantity) + Number(Quantity),
          QtyRem: productLocation.QtyRem + Number(Quantity),
        },
        { where: { id: productLocation.id } }
      );

      await PStockLedger.create({
        Date, // Assuming you meant to use the Date from the request body
        InvoiceNo: InvoiceNumber,
        Particulars: "Form Stock Recycle",
        QtyIn: Quantity,
        QtyOut: 0,
        Balance: productLocation.QtyRem,
        CompanyLocationId: location.id,
        ProductId: Getone.id,
      });

      await Product.update(
        {
          TotalQuantity:Number(Getone.TotalQuantity) + Number(Qty),
          TotalQtyProduced:Number(Getone.TotalQtyProduced) + Number(Qty)
        },
        { where: { ProductName: Name } }
      );

  } catch (error) {
    res.status(400).json({ error: error.message});
  }
}
const UpdateProductByProduction = async (req, res) => {
  const Name = req.params.Name;

  const {
    Date,
    Quantity,
    InvoiceNumber,
    DatePurchased,
    Particulars,
    SellingPrice,
  } = req.body;

  try {
    const Getone = await Product.findOne({ where: { ProductName: Name } });

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Name)

    const Total = (await Number(Getone.TotalQuantity)) + Number(Quantity);

    PStockLedger.create({
      Date: Date,
      InvoiceNo: InvoiceNumber,
      Particulars,
      QtyIn: Quantity,
      QtyOut: "0",
      Balance: Total,
      StockName: Getone.id, // Use ProductName from Getone
    });

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

    Product.update(
      {
        TotalQtyProduced: Number(Getone.TotalQtyProduced) + Number(Quantity),
        TotalQuantity: Total,
        InvoiceNumber,
        SellingPrice,
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

  
  const { Date, Quantity, InvoiceNumber, Particulars,Location } = req.body;

  try {
    const Getone = await Product.findOne({ where: { ProductName: Name } });

    const location = await CompanyLocation.findOne({ where: { LocationName: Location } });

    const productLocation = await ProductLocation.findOne({ 
      where: { ProductId: Getone.id, CompanyLocationId: location.id }
    });

    await productLocation.update(
      {
        QtyRem: Number(productLocation.QtyRem) + Number(Quantity),
        
      },
      {
        where: { id: productLocation.id},
      }
    );

    const Total = (await Number(Getone.TotalQuantity)) + Number(Quantity);

    PStockLedger.create({
      Date: Date,
      InvoiceNo: InvoiceNumber,
      Particulars,
      QtyIn: Quantity,
      QtyOut: "0",
      Balance: productLocation.QtyRem,
      CompanyLocationId: location.id,
      ProductId: Getone.id,
    });

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

    Product.update(
      {
        TotalQuantity: Total,
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

const UpdateProducts = async (req, res) => {
  const Productid = req.params.id;

  const {
    ProductName,
    TotalQuantity,
    CostPrice,
    SellingPrice,
    Category,
    InvoiceNumber,
    DatePurchased,
  } = req.body;

  try {
    // Update the database with the new image path
    Product.update(
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

const UpdateLocation = async (req, res) => {
  const locid = req.params.id;

  const {
    Name,
  } = req.body;

  try {
    // Update the database with the new image path
    CompanyLocation.update(
      {
        Name,
      },
      { where: { id: locid } }
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

const DeleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const Cat = await CompanyLocation.destroy({
      where: { id },
      cascade: true,
    }).then((result) => {
      res.status(200).json({ message: "Record deleted successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const Cat = await Product.destroy({
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
  GetAllProducts,
  GetSingleProducts,
  DeleteProducts,
  UpdateProducts,
  UpdateProductsPurchase,
  GetSingleProductsByName,
  UpdateProductSales,
  GetAllStockCard,
  UpdateProductByProduction,
  UpdateProductByBalance,
  UpdateProductsTransfer,
  UpdateOnMaterialused,
  UpdateProductByRecycle,
  GetAllLocation,
  CreateLocatoin,
  DeleteLocation,
  UpdateLocation
};
