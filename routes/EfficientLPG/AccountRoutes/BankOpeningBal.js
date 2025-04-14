const {
    CreateBankOpeningBalance,
    GetAllBankOpeningBalance,
    GetSingleNewBankOpeningBalance,
    UpdateNewBankOpeningBalance,
    DeleteNewBankOpeningBalance,
 } = require("../../../controllers/EfficientLPG/AccountControllers/BankOpeningbal")
const express = require("express")

const router = express.Router()

router.post('/EBOpening', CreateBankOpeningBalance)

router.get("/EBOpening",  GetAllBankOpeningBalance)

router.get("/EBOpening/:id",GetSingleNewBankOpeningBalance)

router.put("/EBOpening/:id",UpdateNewBankOpeningBalance)

router.delete("/EBOpening/:id",DeleteNewBankOpeningBalance)





module.exports = router