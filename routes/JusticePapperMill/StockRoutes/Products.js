const {
    CreateProducts,
    GetAllProducts ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts,
    UpdateProductsPurchase,
    GetSingleProductsByName,
    UpdateProductSales,
    GetAllStockCard,
    UpdateProductByProduction,
    UpdateProductByBalance
 } = require("../../../controllers/JusticePapperMill/StockControllers/Products")
const express = require("express")

const router = express.Router()

router.post('/jproducts',CreateProducts)

router.get("/jproducts", GetAllProducts)

router.get("/jproducts/:id",GetSingleProducts)

router.get("/jproductsproName",GetSingleProductsByName)

router.get("/jproducts/:id",GetSingleProducts)

router.put("/jproducts/:id",UpdateProducts)

router.put("/jproductPurchase/:Name",UpdateProductsPurchase)

router.put("/jproductProduction/:Name",UpdateProductByProduction)

router.put("/jproductSales/:Name",UpdateProductSales)

router.put("/jStockCards",GetAllStockCard)

router.put("/jproductBalance/:Name",UpdateProductByBalance)

router.delete("/jproducts/:id",DeleteProducts)





module.exports = router