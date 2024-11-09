const {
    CreateStockproduction,
    GetAllStockproduction,
    GetSingleStockproduction,
    UpdateStockproduction,
    DeleteStockproduction,
 } = require("../../../controllers/JusticePapperMill/StockControllers/StockProduction")
const express = require("express")

const router = express.Router()

router.post('/jSproduction',CreateStockproduction)

router.get("/jSproduction", GetAllStockproduction)

router.get("/jSproduction/:id",GetSingleStockproduction)

router.put("/jSproduction/:id",UpdateStockproduction)

router.delete("/jSproduction/:id",DeleteStockproduction)





module.exports = router