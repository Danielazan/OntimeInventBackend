const {
    CreatePaymentVocher,
    GetAllPaymentVochers ,
    GetSinglePaymentVocher,
    DeletePaymentVocher,
    UpdatePaymentVocher
 } = require("../../../controllers/JusticePapperMill/AccountControllers/PaymentVocher")
const express = require("express")

const router = express.Router()

router.post('/JpaymentV',CreatePaymentVocher)

router.get("/JpaymentV", GetAllPaymentVochers)

router.get("/JpaymentV/:id",GetSinglePaymentVocher)

router.put("/JpaymentV/:id",UpdatePaymentVocher)


router.delete("/JpaymentV/:id",DeletePaymentVocher)





module.exports = router