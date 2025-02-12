const {
    CreateSupplier,
    GetAllSupplier ,
    GetSingleSupplier,
    DeleteSupplier,
    UpdateSupplier,
    UpdateSupplierByPurchase,
    UpdateSupplierByPayment
 } = require("../../../controllers/Pillar Pole/SupplierController/Supplier")
const express = require("express")

const router = express.Router()

router.post('/nsupplier',CreateSupplier)

router.get("/nsupplier",GetAllSupplier)

router.get("/nsupplier/:id",GetSingleSupplier)

router.put("/nsupplier/:id",UpdateSupplier)

router.put("/nSuppliersPur/:SupName",UpdateSupplierByPurchase)

router.put("/nSuppliersPay/:SupName",UpdateSupplierByPayment)


router.delete("/nsupplier/:id",DeleteSupplier)





module.exports = router