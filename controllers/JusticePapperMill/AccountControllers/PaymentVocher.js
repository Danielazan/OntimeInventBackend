const { JPaymentVocher } = require("../../../models/JusticePapperMill/AccountsModels/PaymentVocher");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreatePaymentVocher = async (req, res) => {
  

  const {
      ExpenseAccountName,
      SalesSupplierRep,
      Date,
      PayingAccount,
      Location,
      Description,
      PV,
      AmountPaid,
  } = req.body;

  try {

    const pro = await JPaymentVocher.create({
        
        ExpenseAccountName,
      SalesSupplierRep,
      Date,
      PayingAccount,
      Location,
      Description,
      PV,
      AmountPaid,
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllPaymentVochers = async (req, res) => {
  try {
    const Cat = await JPaymentVocher.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSinglePaymentVocher = async(req,res)=>{
  const SalesRepId = req.params.id
  
  try {

    const Getone = await JPaymentVocher.findOne({where: {id:SalesRepId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdatePaymentVocher = async (req, res) => {
    const SalesRepid = req.params.id;
    
    const {
        ExpenseAccountName,
      SalesSupplierRep,
      Date,
      PayingAccount,
      Location,
      Description,
      PV,
      AmountPaid,
    } = req.body;

  try {
    // Update the database with the new image path
    JPaymentVocher.update(
      {
        ExpenseAccountName,
      SalesSupplierRep,
      Date,
      PayingAccount,
      Location,
      Description,
      PV,
      AmountPaid,
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



const DeletePaymentVocher = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await JPaymentVocher.destroy({
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
    CreatePaymentVocher,
    GetAllPaymentVochers ,
    GetSinglePaymentVocher,
    DeletePaymentVocher,
    UpdatePaymentVocher
};
