const {
    CreateSupplierReport,
      GetAllTSupplierReport,
      GetSingleSupplierReport,
      UpdateSupplierReport,
      DeleteSupplierReport,
 } = require("../../../controllers/EfficientLPG/SuppliersControllers/AccountReport")
const express = require("express")

const router = express.Router()

router.post('/esupplierReport',CreateSupplierReport)

router.get("/esupplierReport", GetAllTSupplierReport)

router.get("/esupplierReport/:id",GetSingleSupplierReport)

router.put("/esupplierReport/:id",UpdateSupplierReport)


router.delete("/esupplierReport/:id",DeleteSupplierReport)





module.exports = router