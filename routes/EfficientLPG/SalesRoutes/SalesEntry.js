const {
    CreateSalesEntry,
    GetAllSalesEntry ,
    GetSingleSalesEntry,
    DeleteSalesEntry,
    UpdateSalesEntry
 } = require("../../../controllers/EfficientLPG/SalesControllers/SalesEntry")
const express = require("express")

const router = express.Router()

router.post('/EsalesEntry',CreateSalesEntry)

router.get("/EsalesEntry", GetAllSalesEntry)

router.get("/EsalesEntry/:id",GetSingleSalesEntry)

router.put("/EsalesEntry/:id",UpdateSalesEntry)


router.delete("/EsalesEntry/:id",DeleteSalesEntry)





module.exports = router