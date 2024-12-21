const {
    CreateBankDepositTransfer,
    GetAllBankDepositTransfer,
    GetSingleNewBankDepositTransfer,
    UpdateNewBankDepositTransfer,
    DeleteNewBankDepositTransfer,

 } = require("../../../controllers/JusticePapperMill/AccountControllers/BankDepositeTransfer")
const express = require("express")

const router = express.Router()

router.post('/jbankDT', CreateBankDepositTransfer)

router.get("/jbankDT",  GetAllBankDepositTransfer)

router.get("/jbankDT/:id",GetSingleNewBankDepositTransfer)

router.put("/jbankDT/:id",UpdateNewBankDepositTransfer)

router.delete("/jbankDT/:id",DeleteNewBankDepositTransfer)





module.exports = router