const {
  JBankOpeningBalance,
  } = require("../../../models/JusticePapperMill/AccountsModels/BankOpeningClosing");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  const CreateBankOpeningBalance = async (req, res) => {
    const {
        BankAccount,
          OpeningBalance,
          Date,
          Location,
      
    } = req.body;
  
    try {
      const pro = await JBankOpeningBalance.create({
        BankAccount,
          OpeningBalance,
          Date,
          Location,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllBankOpeningBalance = async (req, res) => {
    try {
      const Cat = await JBankOpeningBalance.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleNewBankOpeningBalance = async (req, res) => {
    const BankOpeningBalanceId = req.params.id;
  
    try {
      const Getone = await JBankOpeningBalance.findOne({ where: { id: BankOpeningBalanceId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateNewBankOpeningBalance = async (req, res) => {
    const BankOpeningBalanceid = req.params.id;
  
    const {
        BankAccount,
          OpeningBalance,
          Date,
          Location,
    } = req.body;
  
    try {
      // Update the database with the new image path
      JBankOpeningBalance.update(
        {
            BankAccount,
            OpeningBalance,
            Date,
            Location,
        },
        { where: { id: BankOpeningBalanceid } }
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
  
  const DeleteNewBankOpeningBalance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JBankOpeningBalance.destroy({
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
    CreateBankOpeningBalance,
    GetAllBankOpeningBalance,
    GetSingleNewBankOpeningBalance,
    UpdateNewBankOpeningBalance,
    DeleteNewBankOpeningBalance,
  };
  