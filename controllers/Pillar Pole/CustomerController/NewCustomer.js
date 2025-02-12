const { Customer,PCustomerLedger } = require("../../../models/Pillar Pole/CustomerModels/NewCustomer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await Customer.drop();
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
  } = req.body;

  try {

    const [customer, created] = await Customer.findOrCreate({
      where: { Name },
      defaults: {
        Name,
        Address,
        PhoneNumber,
        CreditLimit,
        OpeningBalCredit:"0",
        OpeningBalDebit:"0",
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
    res.status(200).json({ customer, created });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllCustomer = async (req, res) => {
  try {
    const Cat = await Customer.findAll({
      include: [{
        model: PCustomerLedger,
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

    const Getone = await Customer.findOne({where: {id:CustomerId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const GetSingleCustomerByName = async(req,res)=>{
  const CusName = req.params.CusName
  
  try {

    const Getone = await Customer.findOne({where: {Name:CusName}}).then(result =>{
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
    Customer.update(
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
  const Getone = await Customer.findOne({where: {Name: CusName}})

  QuaOwed=Number(Getone.CurrentQtyOwedCustomer)+Number(Quantity)

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  // const out = await Getone.QtyOut + Quantity

  PCustomerLedger.create({
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

  Customer.update(
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
      Description,
      ProductName
     } = req.body;

try {
  const Getone = await Customer.findOne({where: {Name: CusName}})

 

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  Customer.update(
    {
      CurrentCashPaid:TotalAmount,
      TotalCashPaid:Getone.TotalCashPaid + Number(TotalAmount),
      TotalQtyBought:Getone.TotalQtyBought + Number(Quantity),
      CurrentQtySupplied:Quantity,
      AccountBalance:Getone.AccountBalance + Number(TotalAmount),
      CurrentQtyPaidFor:Quantity,
      CurrentProductAmountSupplied:ProductName,
    },
    { where: { Name: CusName } }
  );

    PCustomerLedger.create({
    Date,
    InvoiceNo,
    Description,
    QuantityPaid:Quantity,
    AmountPaid:TotalAmount,
    QuantitySupplied:Quantity,
    BalanceInCash:"0",
    BalanceInKg:"0",
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
    
    const Cat = await Customer.destroy({
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
