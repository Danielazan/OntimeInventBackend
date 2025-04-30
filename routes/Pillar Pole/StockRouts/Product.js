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
    UpdateProductByBalance,
    UpdateProductsTransfer,
    UpdateOnMaterialused,
    UpdateProductByRecycle,
    GetAllLocation,
    CreateLocatoin,
    DeleteLocation,
    UpdateLocation,
    UpdateSalePrice
 } = require("../../../controllers/Pillar Pole/StockControllers/Products")
const express = require("express")

const router = express.Router()

router.post('/products',CreateProducts)

router.post('/productsLocation',CreateLocatoin)

router.get("/products", GetAllProducts)

router.get("/productsLocation", GetAllLocation)

router.get("/products/:id",GetSingleProducts)

router.get("/productsproName",GetSingleProductsByName)

router.get("/products/:id",GetSingleProducts)

router.put("/products/:id",UpdateProducts)

router.put("/PEditPrice/:id",UpdateSalePrice)

router.put("/productsLocation/:id",UpdateLocation)

router.put("/productPurchase/:Name",UpdateProductsPurchase)

router.put("/productProduction/:Name",UpdateProductByProduction)

router.put("/productSales/:Name",UpdateProductSales)

router.put("/productTransfers/:Name",UpdateProductsTransfer)

router.put("/productRecycle/:Name",UpdateProductByRecycle)

router.put("/MaterialUsed/:Name",UpdateOnMaterialused)

router.put("/StockCards",GetAllStockCard)

router.put("/productBalance/:Name",UpdateProductByBalance)

router.delete("/productsLocation/:id", DeleteLocation)

router.delete("/products/:id",DeleteProducts)





module.exports = router