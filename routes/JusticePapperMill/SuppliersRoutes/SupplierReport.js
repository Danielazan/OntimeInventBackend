const {
    CreateSupplierReport,
      GetAllTSupplierReport,
      GetSingleSupplierReport,
      UpdateSupplierReport,
      DeleteSupplierReport,
 } = require("../../../controllers/JusticePapperMill/SupplierControllers/SupplierReport")
const express = require("express")

const router = express.Router()

router.post('/jsupplierReport',CreateSupplierReport)

router.get("/jsupplierReport", GetAllTSupplierReport)

router.get("/jsupplierReport/:id",GetSingleSupplierReport)

router.put("/jsupplierReport/:id",UpdateSupplierReport)


router.delete("/jsupplierReport/:id",DeleteSupplierReport)





module.exports = router