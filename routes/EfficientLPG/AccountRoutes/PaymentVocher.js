const {
    CreatePaymentVocher,
    GetAllPaymentVochers ,
    GetSinglePaymentVocher,
    DeletePaymentVocher,
    UpdatePaymentVocher
 } = require("../../../controllers/EfficientLPG/AccountControllers/Paymentvocher")
const express = require("express")

const router = express.Router()

router.post('/EpaymentV',CreatePaymentVocher)

router.get("/EpaymentV", GetAllPaymentVochers)

router.get("/EpaymentV/:id",GetSinglePaymentVocher)

router.put("/EpaymentV/:id",UpdatePaymentVocher)


router.delete("/EpaymentV/:id",DeletePaymentVocher)





module.exports = router