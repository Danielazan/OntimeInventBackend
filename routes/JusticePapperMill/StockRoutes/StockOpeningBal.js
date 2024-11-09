const {
    CreateStockproduction,
    GetAllStockproduction,
    GetSingleStockproduction,
    UpdateStockproduction,
    DeleteStockproduction,
 } = require("../../../controllers/JusticePapperMill/StockControllers/StockOpeningBal")
const express = require("express")

const router = express.Router()

router.post('/JStockOpeningBal',CreateStockproduction)

router.get("/JStockOpeningBal", GetAllStockproduction)

router.get("/JStockOpeningBal/:id",GetSingleStockproduction)

router.put("/JStockOpeningBal/:id",UpdateStockproduction)


router.delete("/JStockOpeningBal/:id",DeleteStockproduction)





module.exports = router