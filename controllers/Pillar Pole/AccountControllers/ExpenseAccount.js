const {
    ExpenseAccount,
  } = require("../../../models/Pillar Pole/AccountsModels/ExpenseAccounts");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  const CreateExpenseAccount = async (req, res) => {
    const {
        AccountName,
        AccountNumber,
      
    } = req.body;
  
    try {
      const pro = await ExpenseAccount.create({
        AccountName,
        AccountNumber
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllExpenseAccount = async (req, res) => {
    try {
      const Cat = await ExpenseAccount.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleNewExpenseAccount = async (req, res) => {
    const ExpenseAccountId = req.params.id;
  
    try {
      const Getone = await ExpenseAccount.findOne({ where: { id: ExpenseAccountId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateNewExpenseAccount = async (req, res) => {
    const ExpenseAccountid = req.params.id;
  
    const {
        AccountName,
        AccountNumber
    } = req.body;
  
    try {
      // Update the database with the new image path
      ExpenseAccount.update(
        {
            AccountName,
            AccountNumber
        },
        { where: { id: ExpenseAccountid } }
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
  
  const DeleteNewExpenseAccount = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await ExpenseAccount.destroy({
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
    CreateExpenseAccount,
    GetAllExpenseAccount,
    GetSingleNewExpenseAccount,
    UpdateNewExpenseAccount,
    DeleteNewExpenseAccount,
  };
  