const {
    CreateProductRecieved,
    GetAllProductRecieved ,
    GetSingleProductRecieved,
    DeleteProductRecieved,
    UpdateProductRecieved
 } = require("../../../controllers/EfficientLPG/ProductsControllers/StockRecieved")
const express = require("express")

const router = express.Router()

router.post('/EStockRecieived',CreateProductRecieved)

router.get("/EStockRecieived", GetAllProductRecieved )

router.get("/EStockRecieived/:id",GetSingleProductRecieved)

router.put("/EStockRecieived/:id",UpdateProductRecieved)


router.delete("/EStockRecieived/:id",DeleteProductRecieved)





module.exports = router