const {
    CreateSupplier,
    GetAllSupplier ,
    GetSingleSupplier,
    DeleteSupplier,
    UpdateSupplier
 } = require("../../../controllers/Pillar Pole/SupplierController/Supplier")
const express = require("express")

const router = express.Router()

router.post('/nsupplier',CreateSupplier)

router.get("/nsupplier",GetAllSupplier)

router.get("/nsupplier/:id",GetSingleSupplier)

router.put("/nsupplier/:id",UpdateSupplier)


router.delete("/nsupplier/:id",DeleteSupplier)





module.exports = router