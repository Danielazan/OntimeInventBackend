const { ECustomer,ECustomerLedger } = require("../../../models/EfficientLPG/CustomerModels/NewCustomer");
const multer = require("multer");
const sequelize = require("../../../database");
const fs = require("fs");
const path = require("path");

async function forceDeleteTable() {
  try {
    ans = await sequelize.query(`DROP TABLE IF EXISTS "EfficientCustomers" CASCADE;`);
    console.log("Table 'EfficientCustomers' deleted successfully.",ans);
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

    const [Customer, created] = await ECustomer.findOrCreate({
      where: { Name },
      defaults: {
        Address,
        PhoneNumber,
        CreditLimit,
        OpeningBalCredit,
        OpeningBalDebit,
        CurrentCashPaid:0,
        TotalCashPaid:0,
        TotalQtyBought:0,
        CurrentAmountOwedCustomer:0,
        CurrentQtySupplied:0,
        CurrentQtyOwedCustomer:0,
        AccountBalance:0,
        CurrentStockowed:0,
        CurrentQtyPaidFor:0,
        CurrentProductSupplied:"None",
        CurrentNumberStockReturned:0
      },
    });

    res.status(200).json(Customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllCustomer = async (req, res) => {
  try {
    const Cat = await ECustomer.findAll({
      include: [
        {

              model: ECustomerLedger,
              // You can add conditions here if needed
            },
          ],
      order: [["createdAt", "DESC"]], // This replaces the reverse() method
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleCustomer = async(req,res)=>{
  const CustomerId = req.params.id
  
  try {

    const Getone = await ECustomer.findOne({where: {id:CustomerId}}).then(result =>{
      res.status(200).json({result})
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
    ECustomer.update(
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

const UpdateCustomerBySales = async (req, res) => {
  const CusName = req.params.CusName;
  
  const {
      Quantity,
      UnitPrice,
      Date,
      InvoiceNo,
      TotalAmount,
      Description,
      ProductName,
      Location,
      Address,
      PhoneNumber
     } = req.body;

try {
  // const Getone = await ECustomer.findOne({where: {Name: CusName}})

  const [Getone, created] = await ECustomer.findOrCreate({
    where: {Name: CusName},
    defaults: {
      Address,
      PhoneNumber,
      CreditLimit:0,
      OpeningBalCredit:0,
      OpeningBalDebit:0,
      CurrentCashPaid:0,
      TotalCashPaid:0,
      TotalQtyBought:0,
      CurrentAmountOwedCustomer:0,
      CurrentQtySupplied:0,
      CurrentQtyOwedCustomer:0,
      AccountBalance:0,
      CurrentStockowed:0,
      CurrentQtyPaidFor:0,
      CurrentProductSupplied:"None",
      CurrentNumberStockReturned:0
    },
  });

  console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
   
  ECustomer.update(
    {
      CurrentCashPaid:Number(TotalAmount),
      TotalCashPaid:Getone.TotalCashPaid + Number(TotalAmount),
      TotalQtyBought:Getone.TotalQtyBought + Number(Quantity),
      CurrentQtySupplied:Number(Quantity),
      AccountBalance:Getone.AccountBalance + Number(TotalAmount),
      CurrentQtyPaidFor:Number(Quantity),
      CurrentProductSupplied:ProductName,
    },
    { where: { Name: CusName } }
  );

  ECustomerLedger.create({
    Date,
    InvoiceNo,
    Description,
    QuantityPaid:Number(Quantity),
    AmountPaid:Number(TotalAmount),
    QuantitySupplied:Quantity,
    BalanceInCash:"0",
    BalanceInKg:"0",
    UnitPrice:Number(UnitPrice),
    Cr:"0",
    Dr:Number(TotalAmount),
    Location,
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
    
    const Cat = await ECustomer.destroy({
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
    UpdateCustomerBySales
};
