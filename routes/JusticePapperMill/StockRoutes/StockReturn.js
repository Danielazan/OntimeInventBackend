const {
    CreateReturnProduct,
    GetAllReturnProducts,
    GetSingleReturnProduct,
    UpdateReturnProduct,
    DeleteReturnProduct,
 } = require("../../../controllers/JusticePapperMill/StockControllers/StockReturned")
const express = require("express")

const router = express.Router()

router.post('/jproReturn',CreateReturnProduct)

router.get("/jproReturn", GetAllReturnProducts )

router.get("/jproReturn/:id",GetSingleReturnProduct)

router.put("/jproReturn/:id",UpdateReturnProduct)


router.delete("/jproReturn/:id",DeleteReturnProduct)





module.exports = router