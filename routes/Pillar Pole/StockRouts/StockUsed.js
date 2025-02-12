const {
    CreateStockUsed,
      GetAllTStockUsed,
      GetSingleStockUsed,
      UpdateStockUsed,
      DeleteStockUsed,
 } = require("../../../controllers/Pillar Pole/StockControllers/StockUsed")
const express = require("express")

const router = express.Router()

router.post('/pstockUsed',CreateStockUsed)

router.get("/pstockUsed", GetAllTStockUsed)

router.get("/pstockUsed/:id",GetSingleStockUsed)

router.put("/pstockUsed/:id",UpdateStockUsed)


router.delete("/pstockUsed/:id",DeleteStockUsed)





module.exports = router