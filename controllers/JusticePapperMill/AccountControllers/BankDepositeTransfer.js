const {
  JBankDepositTransfer,
  } = require("../../../models/JusticePapperMill/AccountsModels/BankDepositTransfer");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  const CreateBankDepositTransfer = async (req, res) => {
    const {
        PaidTo,
          Description,
          Amount,
          Date,
          TellerNo,
          Name,
          PayingAccount,
          Location,
      
    } = req.body;
  
    try {
      const pro = await JBankDepositTransfer.create({
        PaidTo,
          Description,
          Amount,
          Date,
          TellerNo,
          Name,
          PayingAccount,
          Location,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllBankDepositTransfer = async (req, res) => {
    try {
      const Cat = await JBankDepositTransfer.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleNewBankDepositTransfer = async (req, res) => {
    const BankDepositTransferId = req.params.id;
  
    try {
      const Getone = await JBankDepositTransfer.findOne({ where: { id: BankDepositTransferId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateNewBankDepositTransfer = async (req, res) => {
    const BankDepositTransferid = req.params.id;
  
    const {
        PaidTo,
          Description,
          Amount,
          Date,
          TellerNo,
          Name,
          PayingAccount,
          Location,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JBankDepositTransfer.update(
        {
            PaidTo,
            Description,
            Amount,
            Date,
            TellerNo,
            Name,
            PayingAccount,
            Location,
        },
        { where: { id: BankDepositTransferid } }
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
  
  const DeleteNewBankDepositTransfer = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JBankDepositTransfer.destroy({
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
    CreateBankDepositTransfer,
    GetAllBankDepositTransfer,
    GetSingleNewBankDepositTransfer,
    UpdateNewBankDepositTransfer,
    DeleteNewBankDepositTransfer,
  };
  