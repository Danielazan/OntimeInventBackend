const {
    CreateBankOpeningBalance,
    GetAllBankOpeningBalance,
    GetSingleNewBankOpeningBalance,
    UpdateNewBankOpeningBalance,
    DeleteNewBankOpeningBalance,
 } = require("../../../controllers/Pillar Pole/AccountControllers/BankOpeningBal")
const express = require("express")

const router = express.Router()

router.post('/BOpening', CreateBankOpeningBalance)

router.get("/BOpening",  GetAllBankOpeningBalance)

router.get("/BOpening/:id",GetSingleNewBankOpeningBalance)

router.put("/BOpening/:id",UpdateNewBankOpeningBalance)

router.delete("/BOpening/:id",DeleteNewBankOpeningBalance)





module.exports = router