const {
  EProduct, EStockLedger,  EProductLocation
  } = require("../../../models/EfficientLPG/ProductModels/NewProduct");
  const {ECompanyLocation} =require("../../../models/EfficientLPG/ProductModels/Pump")
  const sequelize = require("../../../database");
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

  async function forceDeleteTable() {
    try {
      ans = await sequelize.query(`DROP TABLE IF EXISTS "EProductLocation" CASCADE;`);
      console.log("Table 'EProductLocation' deleted successfully.",ans);
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
      const [product, created] = await EProduct.findOrCreate({
        where: { ProductName },
        defaults: {
        Retalprice,
        CostPrice,
        ReOrderLevel
        },
      })

      res.status(200).json({ product, created });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllNewProducts = async (req, res) => {
    try {
      const Cat = await EProduct.findAll({
        include: [
          {
            model: ECompanyLocation,
            include: [
              {
                model: EStockLedger,
              },
            ],
          },
          {
            model: EStockLedger,
          },
        ],
        order: [["createdAt", "DESC"]], // This replaces the reverse() method
      })
      res.status(200).json(Cat);
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

  const UpdateProductsRecieved = async (req, res) => {
    const Name = req.params.Name;
  
    const {
      Location,
      CostPrice,
      // SellingPrice,
      Category,
      InvoiceNumber,
      DatePurchased,
      Quantity,
    } = req.body;
  
    try {
      const Getone = await EProduct.findOne({ where: { ProductName: Name } });
  
      const [location, locationCreated] = await ECompanyLocation.findOrCreate({
        where: { LocationName: Location },
      });
  
      const [productLocation, productLocationCreated] =
        await EProductLocation.findOrCreate({
          where: { EfficientProductId: Getone.id, ECompanyLocationId: location.id },
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
          quantity: productLocation.quantity + Number(Quantity),
          QtyRem: productLocation.QtyRem + Number(Quantity),
        },
        { where: { id: productLocation.id } }
      );
  
      EStockLedger.create({
        Date: DatePurchased,
        InvoiceNo: InvoiceNumber,
        Particulars: "From Stock Recieved",
        QtyIn: Number(Quantity),
        QtyOut: 0,
        Balance: Number(productLocation.QtyRem),
        ECompanyLocationId: location.id,
        EfficientProductId: Getone.id
      });

      EProduct.update(
        {
          CostPrice,
        },
        { where: { ProductName: Name } }
      )
        .then(() => {
          res.status(200).json({ message: "Record updated successfully" });
        })
        .catch((dbError) => {
          res.status(500).json({ error: dbError });
        });
  
 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const UpdateSalePrice = async (req, res) => {
    const id = req.params.id;
    
    const {
        Costprice,
        SellingPrice
       } = req.body;
  
  try {
    const Getone = await EProduct.findOne({where: {id:id}})
  
     await EProduct.update(
      {
        CostPrice:Costprice,
        Retalprice:SellingPrice
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
      const Getone = await EProduct.findOne({ where: { ProductName: Name } });
      
      const [locationFrom, locationFromCreated] = await ECompanyLocation.findOrCreate({
        where: { LocationName: From }
      });
      
      const [productLocationFrom, productLocationfromCreated] = await EProductLocation.findOrCreate({ 
        where: { EfficientProductId: Getone.id, ECompanyLocationId: locationFrom.id },
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
      // const newLocationQuantity = productLocationFrom.quantity - Number(Quantity);
  
      await EStockLedger.create({
        Date: DatePurchased,
        InvoiceNo: InvoiceNumber,
        Particulars: "From Stock Transfer",
        QtyIn: 0,
        QtyOut: Quantity,
        Balance: productLocationFrom.QtyRem,
        ECompanyLocationId: locationFrom.id,
        EfficientProductId: Getone.id,
        // Use ProductName from Getone
      });

      const [locationTo, locationToCreated] = await ECompanyLocation.findOrCreate({
        where: { LocationName: To },
      });

      const [productLocationTo, productLocationCreated] = await EProductLocation.findOrCreate({ 
        where: { EfficientProductId: Getone.id, ECompanyLocationId: locationTo.id },
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
  
      // await console.log("location",productLocationTo)

      await EStockLedger.create({
        Date: DatePurchased,
        InvoiceNo: InvoiceNumber,
        Particulars: "From Stock Transfer",
        QtyIn: Quantity,
        QtyOut: 0,
        Balance: productLocationTo.QtyRem,
        ECompanyLocationId: locationTo.id,
        EfficientProductId: Getone.id,
        // Use ProductName from Getone
      })
  
      .then(() => {
          res.status(200).json(productLocationTo);
        })
        .catch((dbError) => {
          res.status(500).json({ error: dbError.message });
        });
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
  };
  
  const UpdateProductByBalance = async (req, res) => {
    const Name = req.params.Name;
  
    
    const { Date, Quantity, InvoiceNumber, Particulars,Location } = req.body;
  
    try {
      const Getone = await EProduct.findOne({ where: { ProductName: Name } });
  
      const location = await ECompanyLocation.findOne({ where: { LocationName: Location } });
  
      const productLocation = await EProductLocation.findOne({ 
        where: { EfficientProductId: Getone.id, ECompanyLocationId: location.id }
      });
  
      await productLocation.update(
        {
          quantity:productLocation.QtyRem + Number(Quantity),
          QtyRem: Number(productLocation.QtyRem) + Number(Quantity)
          
        },
        {
          where: { id: productLocation.id},
        }
      );
  
      const Total = (await Number(Getone.TotalQuantity)) + Number(Quantity);
  
      EStockLedger.create({
        Date: Date,
        InvoiceNo: InvoiceNumber,
        Particulars,
        QtyIn: Quantity,
        QtyOut: "0",
        Balance: productLocation.QtyRem,
        ECompanyLocationId: location.id,
        EfficientProductId: Getone.id,
      });
  
      // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)
  
      EProduct.update(
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

  const UpdateProductSales = async (req, res) => {
    const Name = req.params.Name;
  
    const { Date, Quantity, InvoiceNumber, Particulars, AmountPaid,Location } = req.body;
  
    try {
      const Getone = await EProduct.findOne({ where: { ProductName: Name } });
  
      const location = await ECompanyLocation.findOne({
        where: { LocationName: Location }
      });
  
      const [productLocation, productLocationCreated] = await EProductLocation.findOrCreate({ 
        where: { EfficientProductId: Getone.id, ECompanyLocationId: location.id },
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
          QtyRem: Number(productLocation.QtyRem) - Number(Quantity),
          QtySold: productLocation.QtySold + Number(Quantity),
          AmountInCash:productLocation.AmountInCash + AmountPaid
        },
        {
          where: { id: productLocation.id},
        }
      );
      
  
      await EStockLedger.create({
        Date,
        InvoiceNo: InvoiceNumber,
        Particulars: Particulars,
        QtyIn: 0,
        QtyOut: Number(Quantity),
        Balance: productLocation.QtyRem,
        ECompanyLocationId: location.id,
        EfficientProductId: Getone.id,
      })
        
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
      UpdateProductsRecieved,
      UpdateSalePrice,
      UpdateProductsTransfer,
      UpdateProductByBalance,
      UpdateProductSales 
  };
  