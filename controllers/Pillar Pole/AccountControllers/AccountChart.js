const {
  AccountChart,
} = require("../../../models/Pillar Pole/AccountsModels/AccountChart");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const CreateAccountCharts = async (req, res) => {
  const { 
    AccountType, 
    AcHead, 
    profitLoss, 
    AccountName, 
    BalanceSheet } =
    req.body;

  try {
    const pro = await AccountChart.create({
        AccountType, 
        AcHead, 
        profitLoss, 
        AccountName, 
        BalanceSheet
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllAccountCharts = async (req, res) => {
  try {
    const Cat = await AccountChart.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleAccountChart = async (req, res) => {
  const AccountChartId = req.params.id;

  try {
    const Getone = await AccountChart.findOne({
      where: { id: AccountChartId },
    }).then((result) => {
      res.status(200).json({ result });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateAccountChart = async (req, res) => {
  const AccountChartid = req.params.id;

  const { AccountType, 
    AcHead, 
    profitLoss, 
    AccountName, 
    BalanceSheet } = req.body;

  try {
    // Update the database with the new image path
    AccountChart.update(
      {
        AccountType, 
    AcHead, 
    profitLoss, 
    AccountName, 
    BalanceSheet,
      },
      { where: { id: AccountChartid } }
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

const DeleteAccountChart = async (req, res) => {
  try {
    const { id } = req.params;

    const Cat = await AccountChart.destroy({
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
  CreateAccountCharts,
  GetAllAccountCharts,
  GetSingleAccountChart,
  DeleteAccountChart,
  UpdateAccountChart,
};
