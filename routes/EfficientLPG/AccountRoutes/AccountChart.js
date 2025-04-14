const {
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
 } = require("../../../controllers/EfficientLPG/AccountControllers/AccountChart")
const express = require("express")

const router = express.Router()

router.post('/EaccChart',CreateAccountCharts)

router.get("/EaccChart", GetAllAccountCharts)

router.get("/EaccLedgers",GetAllAccountLedger)

router.get("/EaccChart/:id",GetSingleAccountChart)

router.put("/EaccChart/:id",UpdateAccountChart)

router.put("/EaccChartPay/:AccName",UpdateAccountByPayment)

router.put("/EaccChartEx/:AccName",UpdateAccountByExpenses)

router.post("/EaccCharTrans",UpdateAccountByTransfer)

router.delete("/EaccChart/:id",DeleteAccountChart)

// _______________________________________

router.post('/EAcctypes',CreateAccountTypes)

router.get("/EAcctypes", GetAllAccountTypes)

router.get("/EAcctypes/:id",GetSingleAccountType)

router.put("/EAcctypes/:id",UpdateAccountType)


router.delete("/EAcctypes/:id",DeleteAccountType)


// _________________________________________


router.post('/Eacheads',CreateAcHeadss)

router.get("/Eacheads", GetAllAcHeadss)

router.get("/Eacheads/:id",GetSingleAcHeads)

router.put("/Eacheads/:id",UpdateAcHeads)


router.delete("/Eacheads/:id",DeleteAcHeads)





module.exports = router