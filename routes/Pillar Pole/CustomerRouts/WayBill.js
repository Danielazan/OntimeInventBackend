const {
    CreateWayBill,
      GetAllWayBills,
      GetSingleWayBill,
      UpdateWayBill,
      DeleteWayBill,
 } = require("../../../controllers/Pillar Pole/CustomerController/WayBill")
const express = require("express")

const router = express.Router()

router.post('/waybill',CreateWayBill)

router.get("/waybill", GetAllWayBills)

router.get("/waybill/:id",GetSingleWayBill)

router.put("/waybill/:id",UpdateWayBill)


router.delete("/waybill/:id",DeleteWayBill)





module.exports = router