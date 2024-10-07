const {
    CreateSales,
    GetAllSaless,
    GetSingleSales,
    UpdateSales,
    DeleteSales,
 } = require("../../../controllers/Pillar Pole/SalesControllers/Sales")
const express = require("express")

const router = express.Router()

router.post('/sales',CreateSales)

router.get("/sales", GetAllSaless)

router.get("/sales/:id",GetSingleSales)

router.put("/sales/:id",UpdateSales)


router.delete("/sales/:id",DeleteSales)





module.exports = router