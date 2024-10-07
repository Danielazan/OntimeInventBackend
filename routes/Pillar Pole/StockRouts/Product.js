const {
    CreateProducts,
    GetAllProducts ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts,
    UpdateProductsSales
 } = require("../../../controllers/Pillar Pole/StockControllers/Products")
const express = require("express")

const router = express.Router()

router.post('/products',CreateProducts)

router.get("/products", GetAllProducts)

router.get("/products/:id",GetSingleProducts)

router.put("/products/:id",UpdateProducts)

router.put("/productsales/:Name",UpdateProductsSales)


router.delete("/products/:id",DeleteProducts)





module.exports = router