const {
    CreateReturnProduct,
    GetAllReturnProducts,
    GetSingleReturnProduct,
    UpdateReturnProduct,
    DeleteReturnProduct,
 } = require("../../../controllers/JusticePapperMill/StockControllers/StockReturned")
const express = require("express")

const router = express.Router()

router.post('/PproReturn',CreateReturnProduct)

router.get("/PproReturn", GetAllReturnProducts )

router.get("/PproReturn/:id",GetSingleReturnProduct)

router.put("/PproReturn/:id",UpdateReturnProduct)


router.delete("/PproReturn/:id",DeleteReturnProduct)





module.exports = router