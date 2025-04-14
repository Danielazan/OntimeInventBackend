const { EfficientNewSupplier,ESupplierLedger } = require("../../../models/EfficientLPG/SuppliersModels/NewSuppliers");
const sequelize = require("../../../database");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


async function deleteTable() {
    try {
        await EfficientNewSupplier.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }

  async function forceDeleteTable() {
    try {
      await sequelize.query(`DROP TABLE IF EXISTS "EfficientNewSuppliers" CASCADE;`);
      console.log("Table 'EfficientNewSuppliers' deleted successfully.");
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  }

const CreateSupplier = async (req, res) => {
  

  const {
    Name,
    Address,
    PhoneNumber,
  } = req.body;

  try {

    const [Suppliers, created] = await EfficientNewSupplier.findOrCreate({
      where: { Name },
      defaults: {
        Name,
        Address,
        PhoneNumber,
        TimesSupplied: 0,
        LastStockSupplied: 0,
        TotalQtySupplied: 0,
        LastQtySupplied:0,
        CurrentCredit:0,
        CurrentDebit: 0,
        CurrentBalance: 0,
      },
    });

    res.status(200).json(Suppliers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllSupplier = async (req, res) => {
  try {
    const Cat = await EfficientNewSupplier.findAll({
      include: [
        {
          model: ESupplierLedger,
        },
      ],
      order: [["createdAt", "DESC"]]
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // forceDeleteTable()
};

const GetSingleSupplier = async(req,res)=>{
  const SupplierId = req.params.id
  
  try {

    const Getone = await EfficientNewSupplier.findOne({where: {id:SupplierId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateSupplier = async (req, res) => {
    const Supplierid = req.params.id;
    
    const { Name,
        Address,
        PhoneNumber,
         } = req.body;

  try {
    // Update the database with the new image path
    EfficientNewSupplier.update(
      {
        Name,
        Address,
        PhoneNumber,
        
      },
      { where: { id: Supplierid } }
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

const UpdateSupplierByPurchase = async (req, res) => {
  const SupName = req.params.SupName;
  
  const {
      Quantity,
      UnitPrice,
      Date,
      InvoiceNo,
      Description,
      ProductName,
      
     } = req.body;

try {
  const Getone = await EfficientNewSupplier.findOne({where: {Name: SupName}})

  let Credit=Number(UnitPrice)*Number(Quantity)
  
  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  ESupplierLedger.create({
    Date,
    InvoiceNo,
    Description,
    Quantity,
    UnitPrice,
    Credit,
    Debit:"0",
    Balance:Number(Getone.CurrentBalance)+Credit,
    SupplierName:Getone.id 
});

//   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

EfficientNewSupplier.update(
    {
      CurrentCredit:Credit,
      LastQtySupplied:Quantity,
      CurrentBalance:Number(Getone.CurrentBalance) + Credit,
      TimesSupplied:Number(Getone.TimesSupplied) + 1,
      LastStockSupplied:ProductName,
      TotalQtySupplied:Number(Getone.TotalQtySupplied)+Number(Quantity),
    },
    { where: { Name: SupName } }
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

const UpdateSupplierByPayment = async (req, res) => {
  const SupName = req.params.SupName;
  
  const {
      Date,
      InvoiceNo,
      Description,
      Credit,
      Debit,
      NoneBalannce
      
     } = req.body;

try {
  const Getone = await EfficientNewSupplier.findOne({where: {Name: SupName}})
  
  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  ESupplierLedger.create({
    Date,
    InvoiceNo,
    Description,
    Quantity:"0",
    UnitPrice:"0",
    Credit,
    Debit,
    Balance:!NoneBalannce ? Number(Getone.CurrentBalance)-Number(Debit) : NoneBalannce,
    SupplierName:Getone.id 
});

//   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

EfficientNewSupplier.update(
    {
      CurrentCredit:Credit,
      
      CurrentBalance:!NoneBalannce ? Number(Getone.CurrentBalance)+Number(Debit) : NoneBalannce,
    },
    { where: { Name: SupName } }
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

const DeleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await EfficientNewSupplier.destroy({
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
    CreateSupplier,
    GetAllSupplier ,
    GetSingleSupplier,
    DeleteSupplier,
    UpdateSupplier,
    UpdateSupplierByPurchase,
    UpdateSupplierByPayment
};
