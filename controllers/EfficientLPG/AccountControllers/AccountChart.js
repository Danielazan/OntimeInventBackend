const {
    EAccountChart,EAccounntLedger,EAccountLocation,EAccountType,EAcHeads
  } = require("../../../models/EfficientLPG/AccountModels/AccountChart");
  const {ECompanyLocation} = require("../../../models/EfficientLPG/ProductModels/Pump")
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await EAccounntLedger.drop();
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
        await EAccountType.findOrCreate({
            where: { AccountTypeName: AccountType }
          })

           await EAcHeads.findOrCreate({
            where: { AcHeadsName:AcHead }
          })

      const [Account, created] = await EAccountChart.findOrCreate({
      where: { AccountName },
          defaults: {
            AccountType, 
            AcHead, 
            profitLoss, 
            AccountName, 
            BalanceSheet
          },
        });
  
        res.status(200).json(Account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllAccountCharts = async (req, res) => {
    try {
      const Account = await EAccountChart.findAll({
        include: [
          {
            model: ECompanyLocation,
            // through: { attributes: ["quantity"] }, // Include the quantity from ProductLocation
            include: [
              {
                model: EAccounntLedger,
                // You can add conditions here if needed
              },
            ],
          },
          {
            model: EAccounntLedger,
            // You can add separate conditions for product-specific ledger entries
          },
        ],
        order: [["createdAt", "DESC"]], // This replaces the reverse() method
      });
  
      res.status(200).json(Account );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleAccountChart = async (req, res) => {
    const AccountChartId = req.params.id;
  
    try {
      const Getone = await EAccountChart.findOne({
        where: { id: AccountChartId },
      }).then((result) => {
        res.status(200).json({ result });
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const GetAllAccountLedger = async (req, res) => {
    try {
      const Account = await EAccounntLedger.findAll({   
        order: [["createdAt", "DESC"]], // This replaces the reverse() method
      });
  
      res.status(200).json(Account );
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
      EAccountChart.update(
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
        Particulars,
        Location,
        Name
       } = req.body;
  
  try {
    const Getone = await EAccountChart.findOne({where: {AccountName: AccName}})
  
    const location = await ECompanyLocation.findOne({
      where: { LocationName: Location },
    });
  
    const [accountLocation, accountLocationCreated] =
        await EAccountLocation.findOrCreate({
          where: { EfficientAccountChartId: Getone.id, ECompanyLocationId: location.id },
          defaults: {
            TotalAmountIn: 0,
            TotalAmountOut: 0,
            AmoutRem: 0,
            AmountInCash: 0,
            LastCreditAmount: 0,
            LastDebitAmount: 0,
          },
        });
  
        await accountLocation.update(
          {
            TotalAmountIn:accountLocation.TotalAmountIn + Number(AmountPaid),
            AmoutRem: accountLocation.AmoutRem + Number(AmountPaid),
            LastCreditAmount:Number(AmountPaid)
          },
          { where: { id: accountLocation.id } }
        );
  
    EAccounntLedger.create({
        Date: Date,
        InvoiceNo,
        Particulars,
        Name,
        AmountIn: AmountPaid,
        AmountOut: 0,
        Balance: accountLocation.AmoutRem,
        ECompanyLocationId: location.id,
        EfficientAccountChartId: Getone.id,
        // Use ProductName from Getone
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
  
  const UpdateAccountByExpenses = async (req, res) => {
    const AccName = req.params.AccName;
    
    const {
        AmountPaid,
        Date,
        InvoiceNo,
        Particulars,
        Location,
        Name
       } = req.body;
  
  try {
    const Getone = await EAccountChart.findOne({where: {AccountName: AccName}})
  
    const location = await ECompanyLocation.findOne({
      where: { LocationName: Location },
    });
  
    const [accountLocation, accountLocationCreated] =
        await EAccountLocation.findOrCreate({
          where: { EfficientAccountChartId: Getone.id, ECompanyLocationId: location.id },
          defaults: {
            TotalAmountIn: 0,
            TotalAmountOut: 0,
            AmoutRem: 0,
            AmountInCash: 0,
            LastCreditAmount: 0,
            LastDebitAmount: 0,
          },
        });
  
        await accountLocation.update(
          {
            TotalAmountOut:accountLocation.TotalAmountOut + Number(AmountPaid),
            AmoutRem: accountLocation.AmoutRem - Number(AmountPaid),
            LastDebitAmount:Number(AmountPaid)
          },
          { where: { id: accountLocation.id } }
        );
  
    EAccounntLedger.create({
        Date: Date,
        InvoiceNo,
        Particulars,
        Name,
        AmountIn: 0,
        AmountOut: AmountPaid,
        Balance: accountLocation.AmoutRem,
        ECompanyLocationId: location.id,
        EfficientAccountChartId: Getone.id,
        // Use ProductName from Getone
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
  
  const UpdateAccountByTransfer = async (req, res) => {
  
    const {
        AmountPaid,
        Date,
        InvoiceNo,
        Particulars,
        Location,
        Name,
        PayingAcc,
        ExpenseAcc
       } = req.body;
  
  try {
    const Paying = await EAccountChart.findOne({where: {AccountName: PayingAcc}})
  
    const location = await ECompanyLocation.findOne({
      where: { LocationName: Location },
    });
  
    const [PayingAccLocation, accountLocationCreated] =
        await EAccountLocation.findOrCreate({
          where: { EfficientAccountChartId: Paying.id, ECompanyLocationId: location.id },
          defaults: {
            TotalAmountIn: 0,
            TotalAmountOut: 0,
            AmoutRem: 0,
            AmountInCash: 0,
            LastCreditAmount: 0,
            LastDebitAmount: 0,
          },
        });
  
        await PayingAccLocation.update(
          {
            TotalAmountOut:PayingAccLocation.TotalAmountOut + Number(AmountPaid),
            AmoutRem: PayingAccLocation.AmoutRem - Number(AmountPaid),
            LastDebitAmount:Number(AmountPaid)
          },
          { where: { id: PayingAccLocation.id } }
        );
  
    EAccounntLedger.create({
        Date: Date,
        InvoiceNo,
        Particulars,
        Name,
        AmountIn: 0,
        AmountOut: AmountPaid,
        Balance: PayingAccLocation.AmoutRem,
        ECompanyLocationId: location.id,
        EfficientAccountChartId: Paying.id,
        // Use ProductName from Getone
      })
  
      const Expense = await EAccountChart.findOne({where: {AccountName: ExpenseAcc}})
  
      const [ExpenseAccLocation, ExpenseAccLocationCreated] =
        await EAccountLocation.findOrCreate({
          where: { EfficientAccountChartId: Expense.id, ECompanyLocationId: location.id },
          defaults: {
            TotalAmountIn: 0,
            TotalAmountOut: 0,
            AmoutRem: 0,
            AmountInCash: 0,
            LastCreditAmount: 0,
            LastDebitAmount: 0,
          },
        });
  
        await ExpenseAccLocation.update(
          {
            TotalAmountIn:ExpenseAccLocation.TotalAmountOut + Number(AmountPaid),
            AmoutRem: ExpenseAccLocation.AmoutRem + Number(AmountPaid),
            LastCreditAmount:Number(AmountPaid)
          },
          { where: { id: ExpenseAccLocation.id } }
        );
  
    EAccounntLedger.create({
        Date: Date,
        InvoiceNo,
        Particulars,
        Name,
        AmountIn: AmountPaid,
        AmountOut: 0,
        Balance: ExpenseAccLocation.AmoutRem,
        ECompanyLocationId: location.id,
        EfficientAccountChartId: Expense.id,
        // Use ProductName from Getone
      }) .then(() => {
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
  
      const Cat = await EAccountChart.destroy({
        where: { id },
        cascade: true,
      }).then((result) => {
        res.status(200).json({ message: "Record deleted successfully" });
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


//   ______________Account Types ___________________________

const CreateAccountTypes = async (req, res) => {
  

    const { AccountTypeName } = req.body;
  
    try {

      const [AccountType, created] = await EAccountType.findOrCreate({
        where: { AccountTypeName }
      })
      res.status(200).json(AccountType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllAccountTypes = async (req, res) => {
    try {
      const Cat = await EAccountType.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleAccountType = async(req,res)=>{
    const AccountTypeId = req.params.id
    
    try {
  
      const Getone = await EAccountType.findOne({where: {id:AccountTypeId}}).then(result =>{
        res.status(200).json({result})
      })
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  
  }
  
  const UpdateAccountType = async (req, res) => {
      const AccountTypeid = req.params.id;
      
      const {AccountTypeName,} = req.body;
  
    try {
      // Update the database with the new image path
      EAccountType.update(
        {
          AccountTypeName
        },
        { where: { id: AccountTypeid } }
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
  
  
  
  const DeleteAccountType = async (req, res) => {
    try {
      const { id } = req.params;
      
      const Cat = await EAccountType.destroy({
        where: { id },
        cascade: true,
      }).then((result) => {
        res.status(200).json({ message: "Record deleted successfully" });
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



//   ______________________Account Heads______________________


const CreateAcHeadss = async (req, res) => {
  

    const { AcHeadsName } = req.body;
  
    try {
      const [AcHead, created] = await EAcHeads.findOrCreate({
        where: { AcHeadsName }
      })
      res.status(200).json(AcHead);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllAcHeadss = async (req, res) => {
    try {
      const Cat = await EAcHeads.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleAcHeads = async(req,res)=>{
    const AcHeadsId = req.params.id
    
    try {
  
      const Getone = await EAcHeads.findOne({where: {id:AcHeadsId}}).then(result =>{
        res.status(200).json({result})
      })
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  
  }
  
  const UpdateAcHeads = async (req, res) => {
      const AcHeadsid = req.params.id;
      
      const {AcHeadsName,} = req.body;
  
    try {
      // Update the database with the new image path
      EAcHeads.update(
        {
          AcHeadsName
        },
        { where: { id: AcHeadsid } }
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
  
  const DeleteAcHeads = async (req, res) => {
    try {
      const { id } = req.params;
      
      const Cat = await EAcHeads.destroy({
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
    UpdateAccountByExpenses,
    UpdateAccountByPayment,
    UpdateAccountByTransfer,
    GetAllAccountLedger,

    // _______________________
    CreateAccountTypes,
    GetAllAccountTypes,
    GetSingleAccountType,
    UpdateAccountType,
    DeleteAccountType,

    // ___________________
    CreateAcHeadss,
    GetAllAcHeadss,
    GetSingleAcHeads,
    UpdateAcHeads,
    DeleteAcHeads
  };
  