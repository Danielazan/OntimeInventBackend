const {
    CreateWaybill,
      GetAllWaybills,
      GetSingleWaybill,
      UpdateWaybill,
      DeleteWaybill,
 } = require("../../../controllers/JusticePapperMill/SalesControllers/WayBill")
const express = require("express")

const router = express.Router()

router.post('/jwaybill',CreateWaybill)

router.get("/jwaybill", GetAllWaybills)

router.get("/jwaybill/:id",GetSingleWaybill)

router.put("/jwaybill/:id", UpdateWaybill)


router.delete("/jwaybill/:id",DeleteWaybill)





module.exports = router