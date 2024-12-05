const {
    CreateRefund,
      GetAllRefunds,
      GetSingleRefund,
      UpdateRefund,
      DeleteRefund,
 } = require("../../../controllers/EfficientLPG/CustomerControllers/Refund")
const express = require("express")

const router = express.Router()

router.post('/Erefund',CreateRefund)

router.get("/Erefund", GetAllRefunds)

router.get("/Erefund/:id",GetSingleRefund)

router.put("/Erefund/:id",UpdateRefund)


router.delete("/Erefund/:id",DeleteRefund)





module.exports = router