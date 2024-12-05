const {
    CreateSalesEntry,
    GetAllSalesEntry ,
    GetSingleSalesEntry,
    DeleteSalesEntry,
    UpdateSalesEntry
 } = require("../../../controllers/EfficientLPG/SalesControllers/SalesEntryCredit")
const express = require("express")

const router = express.Router()

router.post('/EsalesCredit',CreateSalesEntry)

router.get("/EsalesCredit", GetAllSalesEntry)

router.get("/EsalesCredit/:id",GetSingleSalesEntry)

router.put("/EsalesCredit/:id",UpdateSalesEntry)


router.delete("/EsalesCredit/:id",DeleteSalesEntry)





module.exports = router