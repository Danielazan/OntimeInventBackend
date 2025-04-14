const {
    CreateNewProduct,
      GetAllNewProducts,
      GetSingleNewProduct,
      UpdateNewProduct,
      DeleteNewProduct,
      UpdateProductsRecieved,
      UpdateSalePrice,
      UpdateProductsTransfer,
      UpdateProductByBalance,
      UpdateProductSales
 } = require("../../../controllers/EfficientLPG/ProductsControllers/NewProducts")
const express = require("express")

const router = express.Router()

router.post('/eNewproducts',CreateNewProduct)

router.get("/eNewproducts", GetAllNewProducts)

router.get("/eNewproducts/:id",GetSingleNewProduct)

router.put("/eNewproducts/:id",UpdateNewProduct)

router.put("/eproductsSales/:Name",UpdateProductSales)

router.put("/eProTrans/:Name",UpdateProductsTransfer)

router.put("/eProBalance/:Name",UpdateProductByBalance)

router.put("/EProductRecieved/:Name",UpdateProductsRecieved)

router.put("/EUpdatePrice/:id",UpdateSalePrice)

router.delete("/eNewproducts/:id",DeleteNewProduct)





module.exports = router