const {
    CreateRefund,
      GetAllRefunds,
      GetSingleRefund,
      UpdateRefund,
      DeleteRefund,
 } = require("../../../controllers/Pillar Pole/CustomerController/Refund")
const express = require("express")

const router = express.Router()

router.post('/refund',CreateRefund)

router.get("/refund", GetAllRefunds)

router.get("/refund/:id",GetSingleRefund)

router.put("/refund/:id",UpdateRefund)


router.delete("/refund/:id",DeleteRefund)





module.exports = router