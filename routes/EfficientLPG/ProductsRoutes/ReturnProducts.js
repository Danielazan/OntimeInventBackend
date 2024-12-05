const {
    CreateReturnProduct,
    GetAllReturnProducts,
    GetSingleReturnProduct,
    UpdateReturnProduct,
    DeleteReturnProduct,
 } = require("../../../controllers/EfficientLPG/ProductsControllers/ReturnProducts")
const express = require("express")

const router = express.Router()

router.post('/EproReturn',CreateReturnProduct)

router.get("/EproReturn", GetAllReturnProducts )

router.get("/EproReturn/:id",GetSingleReturnProduct)

router.put("/EproReturn/:id",UpdateReturnProduct)


router.delete("/EproReturn/:id",DeleteReturnProduct)





module.exports = router