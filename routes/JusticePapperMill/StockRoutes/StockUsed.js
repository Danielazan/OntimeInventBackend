const {
    CreateStockUsed,
      GetAllTStockUsed,
      GetSingleStockUsed,
      UpdateStockUsed,
      DeleteStockUsed,
 } = require("../../../controllers/JusticePapperMill/StockControllers/StockUsed")
const express = require("express")

const router = express.Router()

router.post('/jstockUsed',CreateStockUsed)

router.get("/jstockUsed", GetAllTStockUsed)

router.get("/jstockUsed/:id",GetSingleStockUsed)

router.put("/jstockUsed/:id",UpdateStockUsed)


router.delete("/jstockUsed/:id",DeleteStockUsed)





module.exports = router