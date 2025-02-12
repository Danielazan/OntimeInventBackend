const {
  AccountChart,AccounntLedger,AccountLocation
} = require("../../../models/Pillar Pole/AccountsModels/AccountChart");
const {CompanyLocation} = require("../../../models/Pillar Pole/StockModels/Product")
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await AccounntLedger.drop();
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
    const [Account, created] = await AccountChart.findOrCreate({
    where: { AccountName },
        defaults: {
          AccountType, 
          AcHead, 
          profitLoss, 
          AccountName, 
          BalanceSheet
        },
      });

      res.status(200).json({ Account, created });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllAccountCharts = async (req, res) => {
  try {
    const Account = await AccountChart.findAll({
      include: [
        {
          model: CompanyLocation,
          // through: { attributes: ["quantity"] }, // Include the quantity from ProductLocation
          include: [
            {
              model: AccounntLedger,
              // You can add conditions here if needed
            },
          ],
        },
        {
          model: AccounntLedger,
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
  const Getone = await AccountChart.findOne({where: {AccountName: AccName}})

  const location = await CompanyLocation.findOne({
    where: { LocationName: Location },
  });

  const [accountLocation, accountLocationCreated] =
      await AccountLocation.findOrCreate({
        where: { AccountChartId: Getone.id, CompanyLocationId: location.id },
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

  AccounntLedger.create({
      Date: Date,
      InvoiceNo,
      Particulars,
      Name,
      AmountIn: AmountPaid,
      AmountOut: 0,
      Balance: accountLocation.AmoutRem,
      CompanyLocationId: location.id,
      AccountChartId: Getone.id,
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
  const Getone = await AccountChart.findOne({where: {AccountName: AccName}})

  const location = await CompanyLocation.findOne({
    where: { LocationName: Location },
  });

  const [accountLocation, accountLocationCreated] =
      await AccountLocation.findOrCreate({
        where: { AccountChartId: Getone.id, CompanyLocationId: location.id },
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

  AccounntLedger.create({
      Date: Date,
      InvoiceNo,
      Particulars,
      Name,
      AmountIn: 0,
      AmountOut: AmountPaid,
      Balance: accountLocation.AmoutRem,
      CompanyLocationId: location.id,
      AccountChartId: Getone.id,
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
  const Paying = await AccountChart.findOne({where: {AccountName: PayingAcc}})

  const location = await CompanyLocation.findOne({
    where: { LocationName: Location },
  });

  const [PayingAccLocation, accountLocationCreated] =
      await AccountLocation.findOrCreate({
        where: { AccountChartId: Paying.id, CompanyLocationId: location.id },
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

  AccounntLedger.create({
      Date: Date,
      InvoiceNo,
      Particulars,
      Name,
      AmountIn: 0,
      AmountOut: AmountPaid,
      Balance: PayingAccLocation.AmoutRem,
      CompanyLocationId: location.id,
      AccountChartId: Paying.id,
      // Use ProductName from Getone
    })

    const Expense = await AccountChart.findOne({where: {AccountName: ExpenseAcc}})

    const [ExpenseAccLocation, ExpenseAccLocationCreated] =
      await AccountLocation.findOrCreate({
        where: { AccountChartId: Expense.id, CompanyLocationId: location.id },
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

  AccounntLedger.create({
      Date: Date,
      InvoiceNo,
      Particulars,
      Name,
      AmountIn: AmountPaid,
      AmountOut: 0,
      Balance: ExpenseAccLocation.AmoutRem,
      CompanyLocationId: location.id,
      AccountChartId: Expense.id,
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
  UpdateAccountByExpenses,
  UpdateAccountByPayment,
  UpdateAccountByTransfer
};
