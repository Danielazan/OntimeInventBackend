const {
    CreateBankOpeningBalance,
    GetAllBankOpeningBalance,
    GetSingleNewBankOpeningBalance,
    UpdateNewBankOpeningBalance,
    DeleteNewBankOpeningBalance,
 } = require("../../../controllers/JusticePapperMill/AccountControllers/BankOpeningClosing")
const express = require("express")

const router = express.Router()

router.post('/JBOpening', CreateBankOpeningBalance)

router.get("/JBOpening",  GetAllBankOpeningBalance)

router.get("/JBOpening/:id",GetSingleNewBankOpeningBalance)

router.put("/JBOpening/:id",UpdateNewBankOpeningBalance)

router.delete("/JBOpening/:id",DeleteNewBankOpeningBalance)





module.exports = router