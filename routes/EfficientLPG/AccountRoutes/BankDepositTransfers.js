const {
    CreateBankDepositTransfer,
    GetAllBankDepositTransfer,
    GetSingleNewBankDepositTransfer,
    UpdateNewBankDepositTransfer,
    DeleteNewBankDepositTransfer,

 } = require("../../../controllers/EfficientLPG/AccountControllers/BankDepositTransfer")
const express = require("express")

const router = express.Router()

router.post('/EbankDT', CreateBankDepositTransfer)

router.get("/EbankDT",  GetAllBankDepositTransfer)

router.get("/EbankDT/:id",GetSingleNewBankDepositTransfer)

router.put("/EbankDT/:id",UpdateNewBankDepositTransfer)

router.delete("/EbankDT/:id",DeleteNewBankDepositTransfer)





module.exports = router