const {
        CreateCashFlow,
        GetAllCashFlow,
        GetSingleCashFlow,
        UpdateCashFlow,
        DeleteCashFlow,
 } = require("../../../controllers/JusticePapperMill/AccountControllers/CashFlow")
const express = require("express")

const router = express.Router()

router.post('/jcashflow',CreateCashFlow)

router.get("/jcashflow", GetAllCashFlow)

router.get("/jcashflow/:id",GetSingleCashFlow)

router.put("/jcashflow/:id",UpdateCashFlow)


router.delete("/jcashflow/:id",DeleteCashFlow)





module.exports = router