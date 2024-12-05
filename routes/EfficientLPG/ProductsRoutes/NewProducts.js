const {
    CreateNewProduct,
      GetAllNewProducts,
      GetSingleNewProduct,
      UpdateNewProduct,
      DeleteNewProduct,
 } = require("../../../controllers/EfficientLPG/ProductsControllers/NewProducts")
const express = require("express")

const router = express.Router()

router.post('/eNewproducts',CreateNewProduct)

router.get("/eNewproducts", GetAllNewProducts)

router.get("/eNewproducts/:id",GetSingleNewProduct)

router.put("/eNewproducts/:id",UpdateNewProduct)


router.delete("/eNewproducts/:id",DeleteNewProduct)





module.exports = router