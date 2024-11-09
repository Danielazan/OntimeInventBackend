const {
    CreateSupplierReport,
      GetAllTSupplierReport,
      GetSingleSupplierReport,
      UpdateSupplierReport,
      DeleteSupplierReport,
 } = require("../../../controllers/Pillar Pole/SupplierController/SupplierReport")
const express = require("express")

const router = express.Router()

router.post('/PsupplierReport',CreateSupplierReport)

router.get("/PsupplierReport", GetAllTSupplierReport)

router.get("/PsupplierReport/:id",GetSingleSupplierReport)

router.put("/PsupplierReport/:id",UpdateSupplierReport)


router.delete("/PsupplierReport/:id",DeleteSupplierReport)





module.exports = router