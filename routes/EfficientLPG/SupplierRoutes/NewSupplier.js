const {
    CreateSupplier,
    GetAllSupplier ,
    GetSingleSupplier,
    DeleteSupplier,
    UpdateSupplier
 } = require("../../../controllers/EfficientLPG/SuppliersControllers/NewSuppliers")
const express = require("express")

const router = express.Router()

router.post('/enewsupplier',CreateSupplier)

router.get("/enewsupplier", GetAllSupplier)

router.get("/enewsupplier/:id",GetSingleSupplier)

router.put("/enewsupplier/:id",UpdateSupplier)


router.delete("/enewsupplier/:id",DeleteSupplier)





module.exports = router