const { JCustomer,JCustomerLedger } = require("../../../models/JusticePapperMill/CustomersModels/NewCustomer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await JCustomerLedger.drop();
      console.log("Table deleted successfully.");
  } catch (error) {
      console.error("Error deleting table:", error);
  }
}

const CreateCustomer = async (req, res) => {
  

  const {
    Name,
    Address,
    PhoneNumber,
    CreditLimit,
    OpeningBalCredit,
    OpeningBalDebit,  
  } = req.body;

  try {

    const pro = await JCustomer.create({
        Name,
      Address,
      PhoneNumber,
      CreditLimit,
      OpeningBalCredit,
      OpeningBalDebit,
      CurrentCashPaid:"0",
      CurrentAmountOwedCustomer:"0",
      CurrentQtySupplied:"0",
      CurrentQtyOwedCustomer:"0",
      AccountBalance:"0",
      CurrentStockowed:"0",
      CurrentQtyPaidFor:"0",
      CurrentProductAmountSupplied:"0",
      CurrentNumberStockReturned:"0",
      
        
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllCustomer = async (req, res) => {
  try {
    const Cat = await JCustomer.findAll({
      include: [{
        model: JCustomerLedger,
        // as: 'JStockLedger' // Use the alias if you defined one in your model
    }]
    }).then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleCustomer = async(req,res)=>{
  const CustomerId = req.params.id
  
  try {

    const Getone = await JCustomer.findOne({where: {id:CustomerId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const GetSingleCustomerByName = async(req,res)=>{
  const CusName = req.params.CusName
  
  try {

    const Getone = await JCustomer.findOne({where: {Name:CusName}}).then(result =>{
      res.status(200).json(result)
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateCustomer = async (req, res) => {
    const Customerid = req.params.id;
    
    const {Name,
      Address,
      PhoneNumber,
      CreditLimit,
      OpeningBalCredit,
      OpeningBalDebit} = req.body;

  try {
    // Update the database with the new image path
    JCustomer.update(
      {
        Name,
      Address,
      PhoneNumber,
      CreditLimit,
      OpeningBalCredit,
      OpeningBalDebit,
      
      },
      { where: { id: Customerid } }
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

const UpdateCustomerByPayment = async (req, res) => {
  const CusName = req.params.CusName;
  
  const {
      AmountPaid,
      Quantity,
      UnitPrice,
      Date,
      InvoiceNo
     } = req.body;

try {
  const Getone = await JCustomer.findOne({where: {Name: CusName}})

  QuaOwed=Number(Getone.CurrentQtyOwedCustomer)+Number(Quantity)

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  JCustomerLedger.create({
    Date,
    InvoiceNo,
    Description:"From Payment Vocher",
    AmountPaid,
    QuantitySupplied:"0",
    BalanceInCash:Number(Getone.AccountBalance) + Number(AmountPaid),
    BalanceInKg:Number(Getone.CurrentQtyOwedCustomer) +Number(Quantity),
    UnitPrice:UnitPrice,
    Cr:"0",
    Dr:"0",
    CustomerName:Getone.id 
});

//   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

  JCustomer.update(
    {
      CurrentQtyPaidFor:Quantity,
      CurrentQtyOwedCustomer:QuaOwed,
      AccountBalance:Number(Getone.AccountBalance)+Number(AmountPaid),
    },
    { where: { Name: CusName } }
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

const UpdateCustomerBySales = async (req, res) => {
  const CusName = req.params.CusName;
  
  const {
      Quantity,
      UnitPrice,
      Date,
      InvoiceNo,
      TotalAmount
     } = req.body;

try {
  const Getone = await JCustomer.findOne({where: {Name: CusName}})

  QuaOwed=Number(Getone.CurrentQtyOwedCustomer)+Number(Quantity)
  BalInCash=Number(Getone.AccountBalance) - Number(TotalAmount)
  BalInKg=Number(Getone.BalanceInKg)-Number(Quantity)

  CurrentQuantityPaidFor=Number(Getone.CurrentQtyPaidFor)-Number(Quantity)

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  JCustomerLedger.create({
    Date,
    InvoiceNo,
    Description:"From Payment Sales",
    AmountPaid:0,
    QuantitySupplied:Quantity,
    BalanceInCash:Number(Getone.AccountBalance) - Number(TotalAmount),
    BalanceInKg:Number(Getone.CurrentQtyOwedCustomer) - Number(Quantity),
    UnitPrice:UnitPrice,
    Cr:"0",
    Dr:"0",
    CustomerName:Getone.id 
});

//   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

  JCustomer.update(
    {
      CurrentQtyPaidFor:CurrentQuantityPaidFor,
      CurrentQtyOwedCustomer:Number(Getone.AccountBalance)-Number(TotalAmount),
      QuantitySupplied:Quantity,
      AccountBalance:(Number(Getone.AccountBalance)-Number(Quantity))-CurrentQuantityPaidFor,
    },
    { where: { Name: CusName } }
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

const DeleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await JCustomer.destroy({
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
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer,
    UpdateCustomerByPayment,
    GetSingleCustomerByName,
    UpdateCustomerBySales
};
