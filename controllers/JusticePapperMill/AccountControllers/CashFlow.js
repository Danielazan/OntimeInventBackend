const {
    JCashFlow,
    } = require("../../../models/JusticePapperMill/AccountsModels/CashFlow");
    const multer = require("multer");
    const fs = require("fs");
    const path = require("path");
    
    async function deleteTable() {
      try {
          await JCashFlow.drop();
          console.log("Table deleted successfully.");
      } catch (error) {
          console.error("Error deleting table:", error);
      }
    }
    const CreateCashFlow = async (req, res) => {
      const {
          CustomerName,
          Description,
          Date,
          DepositedBy,
          Debit,
          InvoiceNo,
          Credit
        
      } = req.body;
    
      try {

        const Cat = await JCashFlow.findAll({
          order: [['createdAt', 'DESC']], // Ensure you have a createdAt field
          limit: 1 // Get only the last added record
        })

        if (Cat.length ===0){
          console.log("Not Data")
          CurrentBalance=Debit
        }
        else{
          CurrentBalance=Number(Cat[0].Balance) + Number(Debit)
        }
        // console.log(Cat[0].Balance)

         JCashFlow.create({
            CustomerName,
            Description,
            Date,
            DepositedBy,
            Debit,
            InvoiceNo,
            Credit,
            Balance:CurrentBalance,
        }).then((result) => {
          res.status(200).json(result);
          return result;
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    const GetAllCashFlow = async (req, res) => {
      try {
        const Cat = await JCashFlow.findAll().then((result) => {
          res.status(200).json(result.reverse());
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    const GetSingleCashFlow = async (req, res) => {
      const BankOpeningBalanceId = req.params.id;
    
      try {
        const Getone = await JCashFlow.findOne({ where: { id: BankOpeningBalanceId } }).then(
          (result) => {
            res.status(200).json({ result });
          }
        );
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    const UpdateCashFlow = async (req, res) => {
      const BankOpeningBalanceid = req.params.id;
    
      const {
        CustomerName,
        Description,
        Date,
        DepositedBy,
        Debit,
        InvoiceNo,
        Credit,
        Balance,
      } = req.body;
    
      try {
        // Update the database with the new image path
        JCashFlow.update(
          {
            CustomerName,
            Description,
            Date,
            DepositedBy,
            Debit,
            InvoiceNo,
            Credit,
            Balance,
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
    
    const DeleteCashFlow = async (req, res) => {
      try {
        const { id } = req.params;
    
        const Cat = await JCashFlow.destroy({
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
        CreateCashFlow,
        GetAllCashFlow,
        GetSingleCashFlow,
        UpdateCashFlow,
        DeleteCashFlow,
    };
    