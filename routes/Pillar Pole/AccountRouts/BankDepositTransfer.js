const {
    CreateBankDepositTransfer,
    GetAllBankDepositTransfer,
    GetSingleNewBankDepositTransfer,
    UpdateNewBankDepositTransfer,
    DeleteNewBankDepositTransfer,

 } = require("../../../controllers/Pillar Pole/AccountControllers/BankDepositeTransfer")
const express = require("express")

const router = express.Router()

router.post('/bankDT', CreateBankDepositTransfer)

router.get("/bankDT",  GetAllBankDepositTransfer)

router.get("/bankDT/:id",GetSingleNewBankDepositTransfer)

router.put("/bankDT/:id",UpdateNewBankDepositTransfer)

router.delete("/bankDT/:id",DeleteNewBankDepositTransfer)





module.exports = router