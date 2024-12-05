const { ESalesEntryCredit } = require("../../../models/EfficientLPG/SalesModels/SalesEntryCredit");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateSalesEntry = async (req, res) => {
  

  const { 
        ProductName,
        PumpNo,
        UnitPrice,
        SoldTo,
        QunatiySold,
        PumpAttendant,
        Date,
        Location,
        InvoiceNo,
     } = req.body;

  try {

    const pro = await ESalesEntryCredit.create({
        
        ProductName,
        PumpNo,
        UnitPrice,
        SoldTo,
        QunatiySold,
        PumpAttendant,
        Date,
        Location,
        InvoiceNo,
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
    const Cat = await ESalesEntryCredit.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleSalesEntry = async(req,res)=>{
  const SalesRepId = req.params.id
  
  try {

    const Getone = await ESalesEntryCredit.findOne({where: {id:SalesRepId}}).then(result =>{
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
        PumpNo,
        UnitPrice,
        SoldTo,
        QunatiySold,
        PumpAttendant,
        Date,
        Location,
        InvoiceNo,
    } = req.body;

  try {
    // Update the database with the new image path
    ESalesEntryCredit.update(
      {
        ProductName,
        PumpNo,
        UnitPrice,
        SoldTo,
        QunatiySold,
        PumpAttendant,
        Date,
        Location,
        InvoiceNo,
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
    
    const Cat = await ESalesEntryCredit.destroy({
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
