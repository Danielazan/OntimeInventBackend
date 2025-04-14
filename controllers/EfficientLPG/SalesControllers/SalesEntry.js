const { ESalesEntry } = require("../../../models/EfficientLPG/SalesModels/SalesEntry");
const {ECustomer} =require("../../../models/EfficientLPG/CustomerModels/NewCustomer")
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateSalesEntry = async (req, res) => {
  

  const { ProductName,
          UnitPrice,
          PumpNo,
          PumpAttendant,
          OpeningReading,
          Date,
          ClosingReading,
          QuantitySold,
          Total,
          Location,
          PhoneNo,
          Address,
          Testing,
          Variation,
          Deeping,
          InvoiceNo,
          CashPaid,
          Pos,
          Transfer,
          Remark,
          CustomerName,
          Customer
 } = req.body;

  try {

    const pro = await ESalesEntry.create({
        
        ProductName,
        UnitPrice,
        PumpNo,
        PumpAttendant,
        OpeningReading,
        Date,
        ClosingReading,
        QuantitySold,
        Total,
        Location,
        PhoneNo,
        Address,
        Testing,
        Variation,
        Deeping,
        InvoiceNo,
        CashPaid,
        Pos,
        Transfer,
        Remark,
        Customer,
        CustomerName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllSalesEntry = async (req, res) => {
  try {
    const Cat = await ESalesEntry.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleSalesEntry = async(req,res)=>{
  const SalesRepId = req.params.id
  
  try {

    const Getone = await ESalesEntry.findOne({where: {id:SalesRepId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateSalesEntry = async (req, res) => {
    const SalesRepid = req.params.id;
    
    const {
        ProductName,
        UnitPrice,
        PumpNo,
        PumpAttendant,
        OpeningReading,
        Date,
        ClosingReading,
        QuantitySold,
        Total,
        Location,
        PhoneNo,
        Address,
        Testing,
        Variation,
        Deeping,
        InvoiceNo,
        CashPaid,
        Pos,
        Transfer,
        Remark,
        CustomerName
    } = req.body;

  try {
    const [Customer, created] = await ECustomer.findOrCreate({
      where: { Name:CustomerName },
      defaults: {
        Address,
        PhoneNumber,
        CreditLimit,
        OpeningBalCredit,
        OpeningBalDebit,
      },
    });
    // Update the database with the new image path
    ESalesEntry.update(
      {
        ProductName,
        UnitPrice,
        PumpNo,
        PumpAttendant,
        OpeningReading,
        Date,
        ClosingReading,
        QuantitySold,
        Total,
        Location,
        PhoneNo,
        Address,
        Testing,
        Variation,
        Deeping,
        InvoiceNo,
        CashPaid,
        Pos,
        Transfer,
        Remark,
        CustomerName
      },
      { where: { id: SalesRepid } }
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

const DeleteSalesEntry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await ESalesEntry.destroy({
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
    CreateSalesEntry,
    GetAllSalesEntry ,
    GetSingleSalesEntry,
    DeleteSalesEntry,
    UpdateSalesEntry
};
