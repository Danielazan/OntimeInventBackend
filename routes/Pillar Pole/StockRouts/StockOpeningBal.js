const {
    CreateStockproduction,
    GetAllStockproduction,
    GetSingleStockproduction,
    UpdateStockproduction,
    DeleteStockproduction,
 } = require("../../../controllers/Pillar Pole/StockControllers/StockOpeningBal")
const express = require("express")

const router = express.Router()

router.post('/PStockOpeningBal',CreateStockproduction)

router.get("/PStockOpeningBal", GetAllStockproduction)

router.get("/PStockOpeningBal/:id",GetSingleStockproduction)

router.put("/PStockOpeningBal/:id",UpdateStockproduction)


router.delete("/PStockOpeningBal/:id",DeleteStockproduction)





module.exports = router