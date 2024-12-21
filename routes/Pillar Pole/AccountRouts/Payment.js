const {
    CreatePaymentVocher,
    GetAllPaymentVochers ,
    GetSinglePaymentVocher,
    DeletePaymentVocher,
    UpdatePaymentVocher
 } = require("../../../controllers/Pillar Pole/AccountControllers/PaymentVocher")
const express = require("express")

const router = express.Router()

router.post('/PpaymentV',CreatePaymentVocher)

router.get("/PpaymentV", GetAllPaymentVochers)

router.get("/PpaymentV/:id",GetSinglePaymentVocher)

router.put("/PpaymentV/:id",UpdatePaymentVocher)


router.delete("/PpaymentV/:id",DeletePaymentVocher)





module.exports = router