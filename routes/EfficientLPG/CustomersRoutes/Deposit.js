const {
    CreatECusDeposit,
    GetAllDeposit ,
    GetSinglECusDeposit,
    DeletECusDeposit,
    UpdatECusDeposit
 } = require("../../../controllers/EfficientLPG/CustomerControllers/Deposit")
const express = require("express")

const router = express.Router()

router.post('/ECusDeposit',CreatECusDeposit)

router.get("/ECusDeposit", GetAllDeposit)

router.get("/ECusDeposit/:id",GetSinglECusDeposit)

router.put("/ECusDeposit/:id",UpdatECusDeposit)


router.delete("/ECusDeposit/:id",DeletECusDeposit)





module.exports = router