const { JCustomer,JCustomerLedger } = require("../../../models/JusticePapperMill/CustomersModels/NewCustomer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await JCustomer.drop();
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

    const [Customer, created] = await JCustomer.findOrCreate({
      where: { Name },
      defaults: {
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
        TotalCashPaid:"0",
        TotalQtyBought:"0",
      }
      
        
    })
    res.status(200).json({ Customer, created });
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
      InvoiceNo,
      Description
     } = req.body;

try {
  const Getone = await JCustomer.findOne({where: {Name: CusName}})

  QuaOwed=Number(Getone.CurrentQtyOwedCustomer)+Number(Quantity)

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  JCustomerLedger.create({
    Date,
    InvoiceNo,
    Description,
    AmountPaid,
    QuantitySupplied:"0",
    QuantityPaid:Quantity,
    BalanceInCash:Number(Getone.AccountBalance) + Number(AmountPaid),
    BalanceInKg:Number(Getone.CurrentQtyOwedCustomer) +Number(Quantity),
    UnitPrice:UnitPrice,
    Cr:AmountPaid,
    Dr:"0",
    CustomerName:Getone.id 
});

//   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

  JCustomer.update(
    {
      CurrentCashPaid:AmountPaid,
      CurrentQtyPaidFor:Quantity,
      CurrentQtyOwedCustomer:QuaOwed,
      AccountBalance:Number(Getone.AccountBalance)+Number(AmountPaid),
      TotalCashPaid:Number(Getone.TotalCashPaid)+Number(AmountPaid),
      TotalQtyBought:Number(Getone.TotalQtyBought)+Number(Quantity)
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
      TotalAmount,
      Description
     } = req.body;

try {
  const Getone = await JCustomer.findOne({where: {Name: CusName}})

 

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

//   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)

    // For Quantity Owed to Customer

  if (Quantity > Number((Getone.CurrentQtyOwedCustomer))){
    currentqtyowed=0
  }
   else if (Quantity == Number((Getone.CurrentQtyOwedCustomer))){
      currentqtyowed=0
   }
   else{
      currentqtyowed=Number((Getone.CurrentQtyOwedCustomer))- Quantity 
   }

    // For Current Amount Owed to Customer
    if (TotalAmount > Number(Getone.AccountBalance)){
      accountbal=Number(Getone.AccountBalance)-TotalAmount
      cash=0
    }
    else if (TotalAmount == Number(Getone.AccountBalance)){
      accountbal=0
      cash =0
    }
    else{
       accountbal=Number(Getone.AccountBalance)-TotalAmount

       cash =accountbal
    }
  JCustomer.update(
    {
      CurrentQtySupplied:Quantity,
      CurrentQtyOwedCustomer:currentqtyowed,
      CurrentAmountOwedCustomer:cash,
      AccountBalance:accountbal,
      CurrentProductAmountSupplied:TotalAmount
    },
    { where: { Name: CusName } }
  );

    JCustomerLedger.create({
    Date,
    InvoiceNo,
    Description,
    QuantityPaid:0,
    AmountPaid:0,
    QuantitySupplied:Quantity,
    BalanceInCash:accountbal,
    BalanceInKg:currentqtyowed,
    UnitPrice:UnitPrice,
    Cr:"0",
    Dr:TotalAmount,
    CustomerName:Getone.id 
})
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
