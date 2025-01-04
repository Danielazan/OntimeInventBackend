const {
    CreateSupplier,
    GetAllSupplier ,
    GetSingleSupplier,
    DeleteSupplier,
    UpdateSupplier,
    UpdateSupplierByPurchase ,
    UpdateSupplierByPayment
 } = require("../../../controllers/JusticePapperMill/SupplierControllers/NewSuppliers")

const express = require("express")

const router = express.Router()

router.post('/jNewSuppliers',CreateSupplier)

router.get("/jNewSuppliers",GetAllSupplier)

router.get("/jNewSuppliers/:id",GetSingleSupplier)

router.put("/jNewSuppliers/:id",UpdateSupplier)

router.put("/jSuppliersPur/:SupName",UpdateSupplierByPurchase )

router.put("/jSuppliersPay/:SupName",UpdateSupplierByPayment )


router.delete("/jNewSuppliers/:id",DeleteSupplier)





module.exports = router