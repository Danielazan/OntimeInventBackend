const {
    CreateSales,
    GetAllSaless,
    GetSingleSales,
    UpdateSales,
    DeleteSales,
 } = require("../../../controllers/JusticePapperMill/SalesControllers/MakeSales")
const express = require("express")

const router = express.Router()

router.post('/jsales',CreateSales)

router.get("/jsales", GetAllSaless)

router.get("/jsales/:id",GetSingleSales)

router.put("/jsales/:id",UpdateSales)


router.delete("/jsales/:id",DeleteSales)





module.exports = router