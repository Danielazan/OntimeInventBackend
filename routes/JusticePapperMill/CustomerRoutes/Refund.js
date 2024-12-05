const {
    CreateRefund,
      GetAllRefunds,
      GetSingleRefund,
      UpdateRefund,
      DeleteRefund,
 } = require("../../../controllers/JusticePapperMill/CustomerControllers/Refund")
const express = require("express")

const router = express.Router()

router.post('/jrefund',CreateRefund)

router.get("/jrefund", GetAllRefunds)

router.get("/jrefund/:id",GetSingleRefund)

router.put("/jrefund/:id",UpdateRefund)


router.delete("/jrefund/:id",DeleteRefund)





module.exports = router