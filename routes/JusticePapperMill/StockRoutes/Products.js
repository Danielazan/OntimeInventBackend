const {
    CreateProducts,
    GetAllProducts ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts,
    UpdateProductsSales
 } = require("../../../controllers/JusticePapperMill/StockControllers/Products")
const express = require("express")

const router = express.Router()

router.post('/jproducts',CreateProducts)

router.get("/jproducts", GetAllProducts)

router.get("/jproducts/:id",GetSingleProducts)

router.put("/jproducts/:id",UpdateProducts)

router.put("/jproductsales/:Name",UpdateProductsSales)


router.delete("/jproducts/:id",DeleteProducts)





module.exports = router