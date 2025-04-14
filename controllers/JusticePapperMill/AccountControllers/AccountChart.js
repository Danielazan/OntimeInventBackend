const {
    JAccountChart,JAccountLeger
  } = require("../../../models/JusticePapperMill/AccountsModels/AccountChart");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");

  async function deleteTable() {
    try {
        await JAccountChart.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateAccountCharts = async (req, res) => {
    const { 
      AccountType, 
      AcHead, 
      profitLoss, 
      AccountName, 
      BalanceSheet } =
      req.body;
  
    try {
      const pro = await JAccountChart.create({
          AccountType, 
          AcHead, 
          profitLoss, 
          AccountName,
          TotalAmountRemaing:"0",
          TotalAmountOut:"0",
          TotalAmountIn:"0", 
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
      const Cat = await JAccountChart.findAll({
        include: [{
          model: JAccountLeger,
          // as: 'JStockLedger' // Use the alias if you defined one in your model
      }]
      }).then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleAccountChart = async (req, res) => {
    const AccountChartId = req.params.id;
  
    try {
      const Getone = await JAccountChart.findOne({
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
      JAccountChart.update(
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

  const UpdateAccountByPayment = async (req, res) => {
    const AccName = req.params.AccName;
    
    const {
        AmountPaid,
        Date,
        InvoiceNo,
        Description,
        To
       } = req.body;
  
  try {
    const Getone = await JAccountChart.findOne({where: {Name: AccName}})
  
    
  
    console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
     
    // const out = await Getone.QtyOut + Quantity
  
    JAccountLeger.create({
      Date,
      InvoiceNo,
      Description,
      AmountOut:"0",
      AmountIn:AmountPaid,
      PaidTo:To,
    AccountName:Getone.id 
  });
  
  //   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)
  
  JAccountChart.update(
      {
        TotalAmountRemaing:Number(Getone.TotalAmountRemaing) + Number(AmountPaid),
        TotalAmountIn:Number(Getone.TotalAmountIn) + Number(AmountPaid),
        
      },
      { where: { AccountName: AccName } }
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

  const UpdateAccountByExpenses = async (req, res) => {
    const AccName = req.params.AccName;
    
    const {
        AmountPaid,
        Date,
        InvoiceNo,
        Description,
        To,
        ExpenseAccountName
       } = req.body;
  
  try {
    const Getone = await JAccountChart.findOne({where: {AccountName: AccName}})
  
      const GetTo = await JAccountChart.findOne({where: {AccountName: ExpenseAccountName}})
    
  
    console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",Getone)
     
    // const out = await Getone.QtyOut + Quantity
  
    JAccountLeger.create({
      Date,
      InvoiceNo,
      Description,
      AmountOut:AmountPaid,
      AmountIn:"0",
      PaidTo:To,
      AccountName:Getone.id 
  });
  
  //   // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",ledger)
  
  JAccountChart.update(
      {
        TotalAmountRemaing:Number(Getone.TotalAmountRemaing) - Number(AmountPaid),
        TotalAmountOut:Number(Getone.TotalAmountOut) + Number(AmountPaid),
        
      },
      { where: { AccountName: AccName } }
    )
    
    JAccountLeger.create({
      Date,
      InvoiceNo,
      Description,
      AmountOut:"0",
      AmountIn:AmountPaid,
      PaidTo:To,
      AccountName:GetTo.id 
    })

    JAccountChart.update(
      {
        TotalAmountRemaing:Number(GetTo.TotalAmountRemaing) + Number(AmountPaid),
        TotalAmountIn:Number(GetTo.TotalAmountOut) + Number(AmountPaid),
        
      },
      { where: { AccountName: ExpenseAccountName } }
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
  
  const DeleteAccountChart = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JAccountChart.destroy({
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
    UpdateAccountByPayment,
    UpdateAccountByExpenses
  };
  