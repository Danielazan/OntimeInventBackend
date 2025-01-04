const { JusticeNewSupplier,JSupplierLedger } = require("../../../models/JusticePapperMill/SupplierModels/NewSupplier");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


async function deleteTable() {
    try {
        await JSupplierLedger.drop();
        console.log("Table deleted successfully.");
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

    const pro = await JusticeNewSupplier.create({
        Name,
        Address,
        PhoneNumber,
        CurrentCredit:"0",
        CurrentDebit:"0",
        CurrentBalance:"0",
        
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllSupplier = async (req, res) => {
  try {
    const Cat = await JusticeNewSupplier.findAll({
      include: [{
        model: JSupplierLedger,
        // as: 'JStockLedger' // Use the alias if you defined one in your model
    }]
    }).then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleSupplier = async(req,res)=>{
  const SupplierId = req.params.id
  
  try {

    const Getone = await JusticeNewSupplier.findOne({where: {id:SupplierId}}).then(result =>{
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
    JusticeNewSupplier.update(
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
      Description
      
     } = req.body;

try {
  const Getone = await JusticeNewSupplier.findOne({where: {Name: SupName}})

  let Credit=Number(UnitPrice)*Number(Quantity)
  
  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  JSupplierLedger.create({
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

JusticeNewSupplier.update(
    {
      CurrentCredit:Credit,
      
      CurrentBalance:Number(Getone.CurrentBalance)+Credit,
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
  const Getone = await JusticeNewSupplier.findOne({where: {Name: SupName}})
  
  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  JSupplierLedger.create({
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

JusticeNewSupplier.update(
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
    
    const Cat = await JusticeNewSupplier.destroy({
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
    UpdateSupplierByPurchase ,
    UpdateSupplierByPayment
};
